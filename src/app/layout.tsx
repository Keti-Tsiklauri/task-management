// src/app/layout.tsx
"use client";
import type { ReactNode } from "react";
import { GlobalProvider, GlobalContext } from "./context/GlobalContext";
import "./globals.css";
import DesktopNavigation from "./components/navigation/DesktopNavigation";
import TopBar from "./components/main-page/TopBar";
import { useContext } from "react";
import HideSideBar from "./components/navigation/HideSideBar";
import { ClientOnly } from "./components/ClientOnly";
function LayoutContent({ children }: { children: ReactNode }) {
  const context = useContext(GlobalContext);
  if (!context) return null;

  const { hide, activeBoardId } = context;

  return (
    <div className="flex h-screen">
      {/* TopBar */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-10">
        <ClientOnly>
          <TopBar />
        </ClientOnly>
      </div>

      {/* Desktop Navigation */}
      {!hide && (
        <div className="hidden md:block mt-[97px] w-64 shrink-0">
          <DesktopNavigation />
        </div>
      )}
      <div className="absolute bottom-2 hidden md:block">
        <HideSideBar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 `}>
        {children}
      </div>
    </div>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <LayoutContent>{children}</LayoutContent>
        </GlobalProvider>
      </body>
    </html>
  );
}
