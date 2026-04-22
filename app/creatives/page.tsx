"use client";
import TopBar from "@/components/TopBar";
import {
  Star, CheckCircle, AlertTriangle, Clock, Camera,
  TrendingUp, MoreHorizontal, Search, Filter, ArrowUpRight,
  Shield, XCircle, Eye,
} from "lucide-react";
import clsx from "clsx";

const creatives = [
  { name: "Alex Chen",    handle: "@alexchen",      specialty: "Wedding Photography",  status: "Verified", earnings: "$18,420", bookings: 142, rating: 4.9, completion: 98,  joined: "Jan 2023", avatar: "AC", color: "from-violet-400 to-purple-600",  trend: "+12%", flagged: false },
  { name: "Priya Nair",   handle: "@priya.captures", specialty: "Portrait & Lifestyle", status: "Verified", earnings: "$11,280", bookings: 89,  rating: 4.8, completion: 96,  joined: "Mar 2023", avatar: "PN", color: "from-sky-400 to-blue-600",      trend: "+8%",  flagged: false },
  { name: "Marcus Lee",   handle: "@marcuslee.film", specialty: "Commercial Video",     status: "Pending",  earnings: "$6,100",  bookings: 34,  rating: 4.6, completion: 91,  joined: "Aug 2023", avatar: "ML", color: "from-emerald-400 to-teal-600",  trend: "+21%", flagged: false },
  { name: "Zara Ahmed",   handle: "@zaraframes",     specialty: "Event Photography",    status: "Verified", earnings: "$9,750",  bookings: 76,  rating: 4.7, completion: 94,  joined: "May 2023", avatar: "ZA", color: "from-rose-400 to-pink-600",     trend: "+5%",  flagged: false },
  { name: "Carlos Vega",  handle: "@carlosvega",     specialty: "Brand & Product",      status: "Flagged",  earnings: "$4,200",  bookings: 28,  rating: 3.9, completion: 78,  joined: "Oct 2023", avatar: "CV", color: "from-amber-400 to-orange-500",  trend: "-3%",  flagged: true  },
  { name: "Yuki Tanaka",  handle: "@yukishots",      specialty: "Fashion Photography",  status: "Verified", earnings: "$22,100", bookings: 198, rating: 5.0, completion: 100, joined: "Nov 2022", avatar: "YT", color: "from-fuchsia-400 to-purple-600", trend: "+34%", flagged: false },
];

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  Verified: { color: "bg-emerald-50 text-emerald-600", icon: CheckCircle },
  Pending:  { color: "bg-amber-50 text-amber-600",     icon: Clock },
  Flagged:  { color: "bg-rose-50 text-rose-500",       icon: AlertTriangle },
};

function CreativeCard({ c }: { c: typeof creatives[0] }) {
  const s = statusConfig[c.status];
  const StatusIcon = s.icon;
  return (
    <div className={clsx(
      "bg-white rounded-2xl p-5 shadow-card border transition-all duration-200 hover:shadow-card-hover group",
      c.flagged ? "border-rose-100" : "border-stone-100"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={clsx("w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-[13px] font-bold shadow-sm", c.color)}>
            {c.avatar}
          </div>
          <div>
            <p className="text-[13.5px] font-semibold text-stone-900 leading-none">{c.name}</p>
            <p className="text-[11.5px] text-stone-400 mt-0.5">{c.handle}</p>
          </div>
        </div>
        <button className="w-7 h-7 rounded-lg hover:bg-stone-100 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
          <MoreHorizontal size={14} className="text-stone-400" />
        </button>
      </div>

      <div className="flex items-center gap-1.5 mb-4">
        <Camera size={12} className="text-stone-400" />
        <span className="text-[12px] text-stone-500">{c.specialty}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Bookings",   val: c.bookings },
          { label: "Rating",     val: c.rating },
          { label: "Completion", val: `${c.completion}%` },
        ].map(({ label, val }) => (
          <div key={label} className="bg-stone-50 rounded-xl p-2.5 text-center">
            <p className="text-[14px] font-bold text-stone-900">{val}</p>
            <p className="text-[10px] text-stone-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] text-stone-400">Total Earnings</p>
          <p className="text-[16px] font-bold text-stone-900">{c.earnings}</p>
        </div>
        <span className={clsx(
          "flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg",
          c.trend.startsWith("+") ? "text-emerald-600 bg-emerald-50" : "text-rose-500 bg-rose-50"
        )}>
          <TrendingUp size={10} />
          {c.trend}
        </span>
      </div>

      <div className="mb-4">
        <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className={clsx("h-full rounded-full", c.completion >= 95 ? "bg-emerald-400" : c.completion >= 85 ? "bg-accent-400" : "bg-amber-400")}
            style={{ width: `${c.completion}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={clsx("flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg", s.color)}>
          <StatusIcon size={11} strokeWidth={2.5} />
          {c.status}
        </span>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 rounded-lg hover:bg-accent-50 flex items-center justify-center transition-colors">
            <Eye size={13} className="text-stone-400 hover:text-accent-500" />
          </button>
          {c.status === "Pending" && (
            <button className="w-7 h-7 rounded-lg hover:bg-emerald-50 flex items-center justify-center transition-colors">
              <Shield size={13} className="text-stone-400 hover:text-emerald-500" />
            </button>
          )}
          {c.flagged && (
            <button className="w-7 h-7 rounded-lg hover:bg-rose-50 flex items-center justify-center transition-colors">
              <XCircle size={13} className="text-stone-400 hover:text-rose-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CreativesPage() {
  const sorted = [...creatives].sort(
    (a, b) => parseInt(b.earnings.replace(/\D/g, "")) - parseInt(a.earnings.replace(/\D/g, ""))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar title="Creative Management" subtitle="Photographers, videographers & creative professionals" />

      <div className="flex-1 p-8 space-y-6">
        {/* Summary strip */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Creatives", value: "3,241", color: "text-accent-600" },
            { label: "Verified",        value: "2,890", color: "text-emerald-600" },
            { label: "Pending Review",  value: "284",   color: "text-amber-600" },
            { label: "Flagged",         value: "67",    color: "text-rose-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-card border border-stone-100">
              <p className={clsx("text-[22px] font-bold", color)}>{value}</p>
              <p className="text-[12px] text-stone-500 mt-0.5 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {["All", "Verified", "Pending", "Flagged"].map(f => (
              <button key={f} className={clsx(
                "px-4 py-2 rounded-xl text-[12.5px] font-medium transition-all",
                f === "All"
                  ? "bg-accent-500 text-white shadow-glow-sm"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-accent-300 hover:text-accent-600"
              )}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                placeholder="Search creatives..."
                className="pl-8 pr-4 py-2 text-[12.5px] bg-white border border-stone-200 rounded-xl w-52 focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-300 transition-all placeholder:text-stone-400"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-xl text-[12.5px] text-stone-600 hover:border-stone-300 transition-all">
              <Filter size={13} /> Filter
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {creatives.map(c => <CreativeCard key={c.handle} c={c} />)}
        </div>

        {/* Top performers table */}
        <div className="bg-white rounded-2xl shadow-card border border-stone-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold text-stone-900">Top Performers</p>
              <p className="text-[12px] text-stone-400 mt-0.5">Ranked by earnings this quarter</p>
            </div>
            <button className="text-[12px] text-accent-600 font-medium hover:text-accent-700 flex items-center gap-1">
              Full report <ArrowUpRight size={12} />
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                {["#", "Creative", "Specialty", "Bookings", "Earnings", "Rating", "Status"].map(h => (
                  <th key={h} className="py-2.5 px-4 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => (
                <tr key={c.handle} className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors">
                  <td className="py-3 px-4 text-[12px] font-bold text-stone-400">#{i + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className={clsx("w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center text-white text-[10px] font-bold", c.color)}>
                        {c.avatar}
                      </div>
                      <div>
                        <p className="text-[12.5px] font-medium text-stone-800">{c.name}</p>
                        <p className="text-[11px] text-stone-400">{c.handle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[12px] text-stone-500">{c.specialty}</td>
                  <td className="py-3 px-4 text-[12.5px] font-semibold text-stone-800">{c.bookings}</td>
                  <td className="py-3 px-4 text-[12.5px] font-semibold text-stone-800">{c.earnings}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span className="text-[12.5px] font-semibold text-stone-800">{c.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={clsx("text-[11px] font-semibold px-2.5 py-1 rounded-lg", statusConfig[c.status].color)}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
