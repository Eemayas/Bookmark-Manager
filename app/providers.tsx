/** @format */

"use client";
import { store } from "@/store";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={"system"} enableSystem>
      {children}
    </ThemeProvider>
  );
}

export function ReduxProviders({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
