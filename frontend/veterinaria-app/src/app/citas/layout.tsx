import { Dashboard } from "@/components";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return <Dashboard>{children}</Dashboard>;
}
