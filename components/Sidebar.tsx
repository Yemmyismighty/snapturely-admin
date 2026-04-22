"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Camera, AlertTriangle,
  DollarSign, BarChart3, Settings, Bell, LogOut, Zap
} from "lucide-react";
import clsx from "clsx";

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Creatives", href: "/creatives", icon: Camera },
  { label: "Users", href: "/users", icon: Users },
  { label: "Finance", href: "/finance", icon: DollarSign },
  { label: "Disputes", href: "/disputes", icon: AlertTriangle },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-white border-r border-stone-100 flex flex-col z-40 shadow-[1px_0_20px_rgba(0,0,0,0.04)]">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-accent-gradient flex items-center justify-center shadow-glow-sm">
            <Zap size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[13px] font-700 text-stone-900 leading-none tracking-tight">Snapturely</p>
            <p className="text-[10px] text-stone-400 mt-0.5 font-medium tracking-wide uppercase">Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = path === href || path.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 group",
                active
                  ? "bg-accent-50 text-accent-600"
                  : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
              )}
            >
              <Icon
                size={16}
                strokeWidth={active ? 2.5 : 2}
                className={clsx(
                  "transition-colors",
                  active ? "text-accent-500" : "text-stone-400 group-hover:text-stone-600"
                )}
              />
              {label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-stone-100 space-y-0.5">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-stone-500 hover:bg-stone-50 hover:text-stone-800 transition-all">
          <Settings size={16} strokeWidth={2} className="text-stone-400" />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-stone-500 hover:bg-rose-50 hover:text-rose-600 transition-all">
          <LogOut size={16} strokeWidth={2} className="text-stone-400" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
