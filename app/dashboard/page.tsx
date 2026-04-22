"use client";
import TopBar from "@/components/TopBar";
import {
  TrendingUp, TrendingDown, Camera, Users, DollarSign,
  CheckCircle, AlertTriangle, Activity, ArrowUpRight, ArrowDownRight,
  Clock, Zap
} from "lucide-react";
import clsx from "clsx";

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({
  label, value, change, positive, icon: Icon, accent, sub
}: {
  label: string; value: string; change: string; positive: boolean;
  icon: React.ElementType; accent: string; sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 border border-stone-100 group">
      <div className="flex items-start justify-between mb-4">
        <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", accent)}>
          <Icon size={18} strokeWidth={2} className="text-white" />
        </div>
        <span className={clsx(
          "flex items-center gap-1 text-[12px] font-semibold px-2 py-1 rounded-lg",
          positive ? "text-emerald-600 bg-emerald-50" : "text-rose-500 bg-rose-50"
        )}>
          {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {change}
        </span>
      </div>
      <p className="text-[26px] font-bold text-stone-900 leading-none tracking-tight">{value}</p>
      <p className="text-[12px] text-stone-500 mt-1.5 font-medium">{label}</p>
      {sub && <p className="text-[11px] text-stone-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ── Mini sparkline (CSS bars) ──────────────────────────────────────────────
const sparkData = [40, 65, 45, 80, 60, 90, 75, 95, 70, 88, 92, 100];
function Sparkline({ color = "bg-accent-400" }: { color?: string }) {
  return (
    <div className="flex items-end gap-0.5 h-10">
      {sparkData.map((h, i) => (
        <div
          key={i}
          className={clsx("flex-1 rounded-sm opacity-80 bar-chart-bar", color)}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

// ── Activity feed item ─────────────────────────────────────────────────────
function ActivityItem({ icon: Icon, color, text, time }: {
  icon: React.ElementType; color: string; text: string; time: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-stone-50 last:border-0">
      <div className={clsx("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", color)}>
        <Icon size={13} strokeWidth={2.5} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12.5px] text-stone-700 leading-snug">{text}</p>
        <p className="text-[11px] text-stone-400 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

// ── Booking row ────────────────────────────────────────────────────────────
function BookingRow({ client, creative, service, amount, status }: {
  client: string; creative: string; service: string; amount: string; status: string;
}) {
  const statusStyle: Record<string, string> = {
    Completed: "bg-emerald-50 text-emerald-600",
    Pending: "bg-amber-50 text-amber-600",
    Active: "bg-sky-50 text-sky-600",
    Disputed: "bg-rose-50 text-rose-500",
  };
  return (
    <tr className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors">
      <td className="py-3 px-4 text-[12.5px] font-medium text-stone-800">{client}</td>
      <td className="py-3 px-4 text-[12.5px] text-stone-600">{creative}</td>
      <td className="py-3 px-4 text-[12.5px] text-stone-500">{service}</td>
      <td className="py-3 px-4 text-[12.5px] font-semibold text-stone-800">{amount}</td>
      <td className="py-3 px-4">
        <span className={clsx("text-[11px] font-semibold px-2.5 py-1 rounded-lg", statusStyle[status] ?? "bg-stone-100 text-stone-500")}>
          {status}
        </span>
      </td>
    </tr>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar title="Command Center" subtitle="Platform overview — live data" />

      <div className="flex-1 p-8 space-y-6">
        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 status-live" />
          <span className="text-[12px] text-stone-500 font-medium">Live · Updated just now</span>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <StatCard label="Total Bookings" value="12,847" change="+18.4%" positive icon={CheckCircle} accent="bg-accent-gradient" sub="All time" />
          <StatCard label="Platform Revenue" value="$284,920" change="+22.1%" positive icon={DollarSign} accent="bg-gradient-to-br from-emerald-400 to-emerald-600" sub="This month" />
          <StatCard label="Active Creatives" value="3,241" change="+9.7%" positive icon={Camera} accent="bg-gradient-to-br from-sky-400 to-sky-600" sub="Verified accounts" />
          <StatCard label="Completed Projects" value="9,104" change="+14.2%" positive icon={CheckCircle} accent="bg-gradient-to-br from-violet-400 to-violet-600" sub="Last 90 days" />
          <StatCard label="Open Disputes" value="47" change="-12.3%" positive icon={AlertTriangle} accent="bg-gradient-to-br from-amber-400 to-amber-500" sub="Requires review" />
          <StatCard label="Active Users" value="28,410" change="+31.5%" positive icon={Users} accent="bg-gradient-to-br from-rose-400 to-rose-500" sub="Monthly active" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Revenue chart */}
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-card border border-stone-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[14px] font-semibold text-stone-900">Revenue Trend</p>
                <p className="text-[12px] text-stone-400 mt-0.5">Monthly platform revenue</p>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">
                <ArrowUpRight size={13} />
                +22.1% vs last month
              </div>
            </div>
            {/* Bar chart */}
            <div className="flex items-end gap-2 h-36">
              {[55, 70, 48, 85, 62, 90, 78, 95, 68, 88, 92, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={clsx(
                      "w-full rounded-lg transition-all duration-500",
                      i === 11 ? "bg-accent-gradient shadow-glow-sm" : "bg-accent-100"
                    )}
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

          {/* Booking breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-stone-100">
            <p className="text-[14px] font-semibold text-stone-900 mb-1">Booking Types</p>
            <p className="text-[12px] text-stone-400 mb-5">Distribution this month</p>
            <div className="space-y-4">
              {[
                { label: "Photography", pct: 48, color: "bg-accent-500" },
                { label: "Videography", pct: 28, color: "bg-sky-400" },
                { label: "Editing", pct: 14, color: "bg-emerald-400" },
                { label: "Other", pct: 10, color: "bg-amber-400" },
              ].map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[12px] text-stone-600 font-medium">{label}</span>
                    <span className="text-[12px] font-semibold text-stone-800">{pct}%</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className={clsx("h-full rounded-full", color)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100">
              <p className="text-[11px] text-stone-400">Total bookings this month</p>
              <p className="text-[22px] font-bold text-stone-900 mt-0.5">1,284</p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Recent bookings table */}
          <div className="col-span-2 bg-white rounded-2xl shadow-card border border-stone-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
              <p className="text-[14px] font-semibold text-stone-900">Recent Bookings</p>
              <button className="text-[12px] text-accent-600 font-medium hover:text-accent-700 flex items-center gap-1">
                View all <ArrowUpRight size={12} />
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  {["Client","Creative","Service","Amount","Status"].map(h => (
                    <th key={h} className="py-2.5 px-4 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <BookingRow client="Sarah M." creative="Alex Chen" service="Wedding Photo" amount="$1,200" status="Completed" />
                <BookingRow client="James K." creative="Priya Nair" service="Portrait" amount="$350" status="Active" />
                <BookingRow client="Olivia R." creative="Marcus Lee" service="Event Video" amount="$2,400" status="Pending" />
                <BookingRow client="Tom B." creative="Zara Ahmed" service="Headshots" amount="$280" status="Completed" />
                <BookingRow client="Nina P." creative="Carlos V." service="Brand Video" amount="$3,100" status="Disputed" />
              </tbody>
            </table>
          </div>

          {/* Activity feed */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[14px] font-semibold text-stone-900">Live Activity</p>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-live" />
                Live
              </span>
            </div>
            <div>
              <ActivityItem icon={CheckCircle} color="bg-emerald-500" text="New booking confirmed — Wedding Photography" time="2 min ago" />
              <ActivityItem icon={Users} color="bg-sky-500" text="Creative account verified — @priya.captures" time="8 min ago" />
              <ActivityItem icon={AlertTriangle} color="bg-amber-500" text="Dispute opened — Project #4821" time="15 min ago" />
              <ActivityItem icon={DollarSign} color="bg-accent-500" text="Payout processed — $840 to Marcus Lee" time="22 min ago" />
              <ActivityItem icon={Zap} color="bg-violet-500" text="New subscription — Pro Plan activated" time="34 min ago" />
              <ActivityItem icon={Activity} color="bg-rose-500" text="Refund requested — Order #3902" time="41 min ago" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
