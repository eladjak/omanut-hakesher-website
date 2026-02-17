"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "שם פרטי חייב להכיל לפחות 2 תווים" })
    .max(50, { message: "שם פרטי ארוך מדי" }),
  lastName: z
    .string()
    .min(2, { message: "שם משפחה חייב להכיל לפחות 2 תווים" })
    .max(50, { message: "שם משפחה ארוך מדי" }),
  email: z
    .string()
    .min(1, { message: "נא להזין כתובת אימייל" })
    .email({ message: "כתובת אימייל לא תקינה" }),
  phone: z
    .string()
    .min(9, { message: "מספר טלפון חייב להכיל לפחות 9 ספרות" })
    .max(15, { message: "מספר טלפון ארוך מדי" })
    .regex(/^[\d\-+() ]+$/, { message: "מספר טלפון לא תקין" }),
  service: z.string().optional(),
  message: z
    .string()
    .max(2000, { message: "ההודעה ארוכה מדי (מקסימום 2000 תווים)" })
    .optional()
    .or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const initialFormData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof ContactFormData]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormData;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      return false;
    }
    setFieldErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
        throw new Error(
          (data as { error?: string }).error || "אירעה שגיאה בשליחת הטופס"
        );
      }

      setStatus("success");
      setFormData(initialFormData);
      setFieldErrors({});
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "אירעה שגיאה בשליחת הטופס"
      );
    }
  };

  const handleRetry = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  if (status === "success") {
    return (
      <div className="p-10 bg-secondary/10 rounded-2xl text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="inline-flex p-3 rounded-full bg-secondary/20 mb-4">
          <svg
            className="w-8 h-8 text-secondary-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">הפנייה נשלחה בהצלחה!</h3>
        <p className="text-muted-foreground mb-6">
          נחזור אליכם בהקדם האפשרי
        </p>
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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium mb-2"
          >
            שם פרטי <span className="text-destructive">*</span>
          </label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`rounded-xl ${fieldErrors.firstName ? "border-destructive focus-visible:ring-destructive" : ""}`}
            aria-invalid={!!fieldErrors.firstName}
            aria-describedby={
              fieldErrors.firstName ? "firstName-error" : undefined
            }
          />
          {fieldErrors.firstName && (
            <p
              id="firstName-error"
              className="text-destructive text-sm mt-1.5"
              role="alert"
            >
              {fieldErrors.firstName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            שם משפחה <span className="text-destructive">*</span>
          </label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`rounded-xl ${fieldErrors.lastName ? "border-destructive focus-visible:ring-destructive" : ""}`}
            aria-invalid={!!fieldErrors.lastName}
            aria-describedby={
              fieldErrors.lastName ? "lastName-error" : undefined
            }
          />
          {fieldErrors.lastName && (
            <p
              id="lastName-error"
              className="text-destructive text-sm mt-1.5"
              role="alert"
            >
              {fieldErrors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            אימייל <span className="text-destructive">*</span>
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            dir="ltr"
            className={`rounded-xl ${fieldErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <p
              id="email-error"
              className="text-destructive text-sm mt-1.5"
              role="alert"
            >
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            טלפון <span className="text-destructive">*</span>
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            dir="ltr"
            className={`rounded-xl ${fieldErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
          />
          {fieldErrors.phone && (
            <p
              id="phone-error"
              className="text-destructive text-sm mt-1.5"
              role="alert"
            >
              {fieldErrors.phone}
            </p>
          )}
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
          className={`rounded-xl resize-none ${fieldErrors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
          placeholder="מה הביא אתכם אלינו? איך נוכל לעזור?"
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
        />
        {fieldErrors.message && (
          <p
            id="message-error"
            className="text-destructive text-sm mt-1.5"
            role="alert"
          >
            {fieldErrors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div className="p-4 bg-destructive/10 rounded-xl animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <svg
                className="w-5 h-5 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-destructive text-sm font-medium">
                {errorMessage}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRetry}
              className="text-destructive hover:text-destructive shrink-0"
            >
              נסו שוב
            </Button>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-primary hover:bg-primary-dark text-white text-lg py-6"
      >
        {status === "submitting" ? (
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            שולח...
          </span>
        ) : (
          "שליחת פנייה"
        )}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        נחזור אליכם תוך 24 שעות
      </p>
    </form>
  );
}
