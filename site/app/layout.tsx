import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { siteDescription, siteName, siteUrl, withBasePath } from "@/lib/seo-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  alternates: {
    canonical: withBasePath("/")
  },
  openGraph: {
    type: "website",
    title: siteName,
    description: siteDescription,
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <div className="site-header-inner">
              <Link href="/" className="site-brand">
                {siteName}
              </Link>
              <nav className="site-nav">
                <Link href="/problems">Problems</Link>
                <Link href="/learning-paths">Learning Paths</Link>
                <Link href="/tags/arrays">Tags</Link>
                <Link href="/languages/swift">Languages</Link>
              </nav>
            </div>
          </header>
          <main className="site-main">{children}</main>
          <footer className="site-footer">Built for searchable algorithm learning and practical use cases.</footer>
        </div>
      </body>
    </html>
  );
}
