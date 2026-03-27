import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { inter, jetbrainsMono } from "@/lib/fonts";
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>
        <div className="site-shell">
          <SiteHeader />
          <main className="site-main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
