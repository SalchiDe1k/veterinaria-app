import { NavbarHome } from "@/components";

// import { Home as Navbar } from "@/components/navbar/home";

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
