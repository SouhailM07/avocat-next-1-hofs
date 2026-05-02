"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

// Define the schema for the contact form
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function sendEmailAction(data: ContactFormData) {
  try {
    // Validate the data on the server side
    const validatedData = contactSchema.parse(data);

    // Default target email address
    const targetEmail = process.env.TARGET_EMAIL || "Mahifaresavocat@gmail.com";
    
    // Check ifSMTP is configured
    const hasSmtpConfig = process.env.SMTP_USER && process.env.SMTP_PASS;

    if (hasSmtpConfig) {
      // Create a transporter using SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Send the email
      await transporter.sendMail({
        from: `"${validatedData.name}" <${process.env.SMTP_USER}>`, // Send from the authenticated user
        replyTo: validatedData.email,
        to: targetEmail,
        subject: `New Contact Request: ${validatedData.subject}`,
        text: `
Name: ${validatedData.name}
Email: ${validatedData.email}
Subject: ${validatedData.subject}

Message:
${validatedData.message}
        `,
        html: `
          <h3>New Contact Request from ${validatedData.name}</h3>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <hr />
          <p>${validatedData.message.replace(/\n/g, "<br/>")}</p>
        `,
      });
      
      return { success: true, message: "Email sent successfully!" };
    } else {
      // Simulate sending the email in development/fallback
      console.log("=========================================");
      console.log("SIMULATED EMAIL SENT (No SMTP config found)");
      console.log("To: ", targetEmail);
      console.log("From: ", validatedData.email);
      console.log("Subject:", validatedData.subject);
      console.log("Message:", validatedData.message);
      console.log("=========================================");
      
      return { success: true, message: "Email simulated successfully! (Add SMTP details in .env to send for real)" };
    }
  } catch (error) {
    console.error("Failed to send email:", error);
    if (error instanceof z.ZodError) {
      return { success: false, message: "Validation failed.", errors: (error as any).errors };
    }
    return { success: false, message: "Failed to send email. Please try again later." };
  }
}
