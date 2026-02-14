"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "אירעה שגיאה בשליחת הטופס");
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "אירעה שגיאה בשליחת הטופס"
      );
    }
  };

  if (status === "success") {
    return (
      <div className="p-10 bg-secondary/10 rounded-2xl text-center">
        <div className="inline-flex p-3 rounded-full bg-secondary/20 mb-4">
          <svg className="w-8 h-8 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">הפנייה נשלחה בהצלחה!</h3>
        <p className="text-muted-foreground mb-6">נחזור אליכם בהקדם האפשרי</p>
        <Button
          variant="ghost"
          onClick={() => setStatus("idle")}
          className="text-primary font-medium"
        >
          שליחת פנייה נוספת
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            שם פרטי
          </label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            שם משפחה
          </label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            אימייל
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            dir="ltr"
            className="rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            טלפון
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            dir="ltr"
            className="rounded-xl"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium mb-2">
          מה מעניין אתכם?
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
        >
          <option value="">בחרו שירות</option>
          <option value="couples">ייעוץ זוגי</option>
          <option value="individual">ליווי אישי</option>
          <option value="workshop">סדנה</option>
          <option value="online">פגישות אונליין</option>
          <option value="other">אחר</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          ספרו לנו קצת
        </label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="rounded-xl resize-none"
          placeholder="מה הביא אתכם אלינו? איך נוכל לעזור?"
        />
      </div>

      {status === "error" && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-xl text-sm">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-primary hover:bg-primary-dark text-white text-lg py-6"
      >
        {status === "submitting" ? "שולח..." : "שליחת פנייה"}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        נחזור אליכם תוך 24 שעות
      </p>
    </form>
  );
}
