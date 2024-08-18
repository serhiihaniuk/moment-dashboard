import { AppProvider } from "@/shared/provider";
import Link from "next/link";

// Header component
function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Билеты
            </Link>
          </li>
          <li>
            <Link
              href="/partner-request"
              className="hover:text-blue-200 transition-colors"
            >
              Партнерство
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
      </div>
    </AppProvider>
  );
}
