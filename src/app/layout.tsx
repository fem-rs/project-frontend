import type { Metadata } from "next";
import "../css/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "LC project frontend",
  description: "User-facing portion of my lc project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>

      <body>{children}
        <Toaster icons={{
          success: <Check className="gap-2" color="#34eb3a" />,
          error: <X className="gap-2" color="#f20707" />
        }}
        />
      </body>

    </html>
  );
}
