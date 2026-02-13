import { NextResponse } from "next/server";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      return NextResponse.json(
        { error: "חסרים שדות חובה" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "כתובת אימייל לא תקינה" },
        { status: 400 }
      );
    }

    // If Resend API key is configured, send email
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "hello@omanut-hakesher.co.il";

    if (resendApiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "אומנות הקשר <noreply@omanut-hakesher.co.il>",
          to: [contactEmail],
          subject: `פנייה חדשה מ${data.firstName} ${data.lastName}`,
          html: `
            <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #c97b63;">פנייה חדשה מהאתר</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">שם:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.firstName} ${data.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">אימייל:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">טלפון:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">שירות מבוקש:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.service || "לא צוין"}</td>
                </tr>
              </table>
              <h3 style="color: #c97b63; margin-top: 20px;">הודעה:</h3>
              <p style="background: #f5f0e8; padding: 15px; border-radius: 8px;">${data.message || "לא נכתבה הודעה"}</p>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send email via Resend");
        // Don't fail the request, just log the error
      }
    } else {
      // Log the contact form submission for development
      console.log("Contact form submission:", data);
    }

    return NextResponse.json({
      success: true,
      message: "הפנייה נשלחה בהצלחה! נחזור אליך בהקדם.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "אירעה שגיאה בשליחת הפנייה. אנא נסו שוב." },
      { status: 500 }
    );
  }
}
