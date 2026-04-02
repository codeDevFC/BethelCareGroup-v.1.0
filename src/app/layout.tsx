import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth/AuthContext";
import "./globals.css";
export const metadata: Metadata = {
title: "BETHEL • CARE • GROUP",
description: "Discipleship For Mission - Bethel Willenhall Church",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
{/* suppressHydrationWarning is added to the body to prevent errors caused by browser extensions like Grammarly injecting attributes */}
<body className="bg-gray-50 antialiased" suppressHydrationWarning>
<AuthProvider>{children}</AuthProvider>
</body>
</html>
);
}
