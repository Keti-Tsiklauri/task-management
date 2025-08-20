// src/app/layout.tsx

import type { ReactNode } from "react";
import { GlobalProvider } from "./context/GlobalContext";
import "./globals.css";
import DesktopNavigation from "./components/navigation/DesktopNavigation";
import MobileNavigation from "./components/navigation/MobileNavigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <div className="hidden md:block">
            <DesktopNavigation />
          </div>
          <div className="md:hidden">
            <MobileNavigation />
          </div>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
