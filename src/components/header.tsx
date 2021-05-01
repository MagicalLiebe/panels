import Link from "next/link";
import type { VFC } from "react";

const items = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Admin" },
];

export const Header: VFC = () => {
  return (
    <header className="bg-gray-200">
      <h1 className="text-center text-4xl">Panels</h1>
      <nav className="flex justify-center">
        {items.map(({ href, label }) => {
          return (
            <Link key={href} href={href}>
              <a className="inline-block p-4 hover:text-blue-400">{label}</a>
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
