import type { ReactNode } from "react";
import Link from "next/link";

const navigation = [
  ["Home", "/"],
  ["Characters", "/characters"],
  ["Chronology", "/chronology"],
  ["Relationships", "/relationships"],
] as const;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ borderBottom: "1px solid #ddd" }}>
          <nav aria-label="Primary navigation" style={{ maxWidth: 960, margin: "0 auto", padding: "16px 24px", display: "flex", gap: 20 }}>
            {navigation.map(([label, href]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
