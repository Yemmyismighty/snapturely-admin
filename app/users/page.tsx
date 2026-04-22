"use client";
import TopBar from "@/components/TopBar";
import {
  Users, CheckCircle, Clock, XCircle, Search,
  Filter, MoreHorizontal, Mail, Calendar, ShoppingBag,
  TrendingUp, ArrowUpRight
} from "lucide-react";
import clsx from "clsx";

const users = [
  { name: "Sarah Mitchell", email: "s.mitchell@email.com", joined: "Jan 12, 2024", bookings: 8, spent: "$4,820", status: "Active", avatar: "SM", color: "from-violet-400 to-purple-600" },
  { name: "James Kowalski", email: "j.kowalski@email.com", joined: "Feb 3, 2024", bookings: 3, spent: "$1,050", status: "Active", avatar: "JK", color: "from-sky-400 to-blue-600" },
  { name: "Olivia Reynolds", email: "o.reynolds@email.com", joined: "Mar 18, 2024", bookings: 12, spent: "$9,200", status: "Active", avatar: "OR", color: "from-emerald-400 to-teal-600" },
  { name: "Tom Brennan", email: "t.brennan@email.com", joined: "Apr 5, 2024", bookings: 1, spent: "$280", status: "Inactive", avatar: "TB", color: "from-amber-400 to-orange-500" },
  { name: "Nina Patel", email: "n.patel@email.com", joined: "May 22, 2024", bookings: 5, spent: "$6,100", status: "Suspended", avatar: "NP", color: "from-rose-400 to-pink-600" },
  { name: "David Okafor", email: "d.okafor@email.com", joined: "Jun 8, 2024", bookings: 7, spent: "$3,400", status: "Active", avatar: "DO", color: "from-fuchsia-400 to-purple-600" },
];

const statusStyle: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-600",
  Inactive: "bg-stone-100 text-stone-500",
  Suspended: "bg-rose-50 text-rose-500",
};

export default function UsersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar title="User Management" subtitle="Platform clients and end users" />

      <div className="flex-1 p-8 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: "28,410", color: "text-accent-600" },
            { label: "Active (30d)", value: "19,284", color: "text-emerald-600" },
            { label: "New This Month", value: "1,842", color: "text-sky-600" },
            { label: "Suspended", value: "124", color: "text-rose-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-card border border-stone-100">
              <p className={clsx("text-[24px] font-bold", color)}>{value}</p>
              <p className="text-[12px] text-stone-500 mt-0.5 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {["All", "Active", "Inactive", "Suspended"].map(f => (
              <button key={f} className={clsx(
                "px-4 py-2 rounded-xl text-[12.5px] font-medium transition-all",
                f === "All" ? "bg-accent-500 text-white shadow-glow-sm" : "bg-white text-stone-600 border border-stone-200 hover:border-accent-300 hover:text-accent-600"
              )}>{f}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input placeholder="Search users..." className="pl-8 pr-4 py-2 text-[12.5px] bg-white border border-stone-200 rounded-xl w-52 focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-300 transition-all placeholder:text-stone-400" />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-xl text-[12.5px] text-stone-600 hover:border-stone-300 transition-all">
              <Filter size={13} /> Filter
            </button>
          </div>
        </div>

        {/* User table */}
        <div className="bg-white rounded-2xl shadow-card border border-stone-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                {["User","Email","Joined","Bookings","Total Spent","Status",""].map(h => (
                  <th key={h} className="py-3 px-4 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.email} className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={clsx("w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-[11px] font-bold", u.color)}>
                        {u.avatar}
                      </div>
                      <span className="text-[13px] font-medium text-stone-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-[12px] text-stone-500">
                      <Mail size={11} className="text-stone-400" />
                      {u.email}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-[12px] text-stone-500">
                      <Calendar size={11} className="text-stone-400" />
                      {u.joined}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-stone-800">
                      <ShoppingBag size={11} className="text-stone-400" />
                      {u.bookings}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[13px] font-bold text-stone-900">{u.spent}</td>
                  <td className="py-3.5 px-4">
                    <span className={clsx("text-[11px] font-semibold px-2.5 py-1 rounded-lg", statusStyle[u.status])}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button className="w-7 h-7 rounded-lg hover:bg-stone-100 flex items-center justify-center transition-colors">
                      <MoreHorizontal size={14} className="text-stone-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Growth chart */}
        <div className="bg-white rounded-2xl p-6 shadow-card border border-stone-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[14px] font-semibold text-stone-900">User Growth</p>
              <p className="text-[12px] text-stone-400 mt-0.5">New signups per month — 2024</p>
            </div>
            <button className="text-[12px] text-accent-600 font-medium hover:text-accent-700 flex items-center gap-1">
              Full report <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="flex items-end gap-2 h-28">
            {[30,42,38,55,48,66,58,74,62,80,88,100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className={clsx("w-full rounded-lg transition-all duration-500", i === 11 ? "bg-accent-gradient shadow-glow-sm" : "bg-accent-100")}
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3">
            {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
              <span key={m} className="text-[10px] text-stone-400 flex-1 text-center">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
