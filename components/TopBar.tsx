"use client";
import { Bell, Search, ChevronDown } from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-stone-100 flex items-center justify-between px-8 sticky top-0 z-30">
      <div>
        <h1 className="text-[15px] font-semibold text-stone-900 leading-none">{title}</h1>
        {subtitle && <p className="text-[12px] text-stone-400 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-4 py-2 text-[13px] bg-stone-50 border border-stone-200 rounded-xl w-52 focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-300 transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition-all">
          <Bell size={15} className="text-stone-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-500 border-2 border-white" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl hover:bg-stone-50 transition-all border border-transparent hover:border-stone-200">
          <div className="w-7 h-7 rounded-lg bg-accent-gradient flex items-center justify-center text-white text-[11px] font-bold">
            A
          </div>
          <span className="text-[13px] font-medium text-stone-700">Admin</span>
          <ChevronDown size={13} className="text-stone-400" />
        </button>
      </div>
    </header>
  );
}
