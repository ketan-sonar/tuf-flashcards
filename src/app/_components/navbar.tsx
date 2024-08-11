import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-center gap-6">
        <Link href="/" className="text-white hover:text-gray-400">
          Home
        </Link>
        <Link href="/admin" className="text-white hover:text-gray-400">
          Admin Page
        </Link>
      </div>
    </nav>
  );
}
