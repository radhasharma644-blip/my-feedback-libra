import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "Customer Feedback | Libra Automobiles - Tata Motors",
    template: "%s | Libra Automobiles",
  },

  description:
    "Share your experience with Libra Automobiles Tata Motors dealership. Your feedback helps us improve our service and customer satisfaction.",

  keywords: [
    "Tata Motors feedback",
    "Libra Automobiles",
    "customer feedback form",
    "dealership survey",
    "vehicle feedback India",
  ],

  authors: [{ name: "Libra Automobiles" }],
  creator: "Libra Automobiles",

  openGraph: {
    title: "Libra Automobiles Customer Feedback",
    description:
      "Tell us about your experience with Tata Motors dealership. Your feedback matters.",
    url: "https://yourdomain.com/feedback",
    siteName: "Libra Automobiles",
    images: [
      {
        url: "/cover.jpg",
        width: 1200,
        height: 630,
        alt: "Tata Motors Feedback",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Libra Automobiles Feedback",
    description:
      "Share your Tata Motors dealership experience with us.",
    images: ["/cover.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
