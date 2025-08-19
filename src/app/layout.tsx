// src/app/layout.tsx
import type { ReactNode } from "react";
import { GlobalProvider } from "./context/GlobalContext";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
