"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/risk-monitor", label: "Risk Monitor" },
  { href: "/recovery-center", label: "Recovery Center" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">ConversionPilot AI</h1>
        <p className="text-sm text-slate-300 mt-2">
          E-commerce conversion recovery platform
        </p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-white text-slate-900 font-semibold"
                  : "text-slate-200 hover:bg-slate-800"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}