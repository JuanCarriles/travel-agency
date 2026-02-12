import { createClient } from "smtpexpress";

export const smtpexpressClient = createClient({
    projectId: import.meta.env.VITE_SMTP_PROJECT_ID,
    projectSecret: import.meta.env.VITE_SMTP_PROJECT_SECRET,
});

export const SENDER_EMAIL = import.meta.env.VITE_SMTP_SENDER_EMAIL;
