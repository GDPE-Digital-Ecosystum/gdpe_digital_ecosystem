import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "RajGram Digital",
  description: "Leader Branding Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}