import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Snapturely Admin",
  description: "Internal admin portal for Snapturely stakeholders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-100 antialiased">
        <Sidebar />
        <div className="ml-[220px] min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
