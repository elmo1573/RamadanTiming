import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Islah-e-Nafs | Ramadan Timings",
  description: "Get accurate Suhoor and Iftar times for your location during Ramadan",
  keywords: ["ramadan", "suhoor", "iftar", "prayer times", "fasting", "islamic"],
  openGraph: {
    title: "Islah-e-Nafs | Ramadan Timings",
    description: "Get accurate Suhoor and Iftar times for your location during Ramadan",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="islamic-pattern" />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
