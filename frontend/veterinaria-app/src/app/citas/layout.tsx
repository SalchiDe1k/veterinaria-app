import { NavbarHome } from "@/components";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-base-200">
      <NavbarHome>{children}</NavbarHome>
    </main>
  );
}
