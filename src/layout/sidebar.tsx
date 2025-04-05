"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const modules = [
  { id: "pi", name: "Estimate Pi" },
  { id: "gambler", name: "Gambler's Ruin" },
  { id: "coin", name: "Coin Toss" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          Monte Carlo Playground
        </h2>
      </div>
      <nav className="p-4">
        <div className="space-y-1">
          {modules.map((mod) => (
            <Link
              key={mod.id}
              href={`/${mod.id}`}
              className={`
                block px-4 py-2.5 rounded-md text-sm font-medium transition-colors
                ${
                  pathname === `/${mod.id}`
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
            >
              {mod.name}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}
