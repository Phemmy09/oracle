import "./globals.css";

export const metadata = {
  title: "ORACLE — Sovereign Intelligence Engine",
  description: "Personal intelligence briefing platform. Jobs, scholarships, strategic intel, and daily operational directives.",
  keywords: "intelligence, jobs, scholarships, AI, automation, opportunities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="scanline-overlay" />
        {children}
      </body>
    </html>
  );
}
