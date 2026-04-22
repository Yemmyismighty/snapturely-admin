"use client";
import TopBar from "@/components/TopBar";
import {
  DollarSign, TrendingUp, TrendingDown, ArrowUpRight,
  ArrowDownRight, CreditCard, Wallet, RefreshCw, Download,
  CheckCircle, Clock, XCircle, Filter
} from "lucide-react";
import clsx from "clsx";

const transactions = [
  { id: "#TXN-8821", type: "Booking", from: "Sarah M.", to: "Alex Chen", amount: "+$1,200", commission: "$120", date: "Dec 18, 2024", status: "Settled" },
  { id: "#TXN-8820", type: "Payout", from: "Platform", to: "Priya Nair", amount: "-$840", commission: "—", date: "Dec 18, 2024", status: "Processing" },
  { id: "#TXN-8819", type: "Subscription", from: "Marcus Lee", to: "Platform", amount: "+$49", commission: "—", date: "Dec 17, 2024", status: "Settled" },
  { id: "#TXN-8818", type: "Refund", from: "Platform", to: "Tom B.", amount: "-$350", commission: "-$35", date: "Dec 17, 2024", status: "Refunded" },
  { id: "#TXN-8817", type: "Booking", from: "Olivia R.", to: "Marcus Lee", amount: "+$2,400", commission: "$240", date: "Dec 16, 2024", status: "Settled" },
  { id: "#TXN-8816", type: "Payout", from: "Platform", to: "Zara Ahmed", amount: "-$1,100", commission: "—", date: "Dec 16, 2024", status: "Settled" },
  { id: "#TXN-8815", type: "Booking", from: "Nina P.", to: "Carlos V.", amount: "+$3,100", commission: "$310", date: "Dec 15, 2024", status: "Held" },
];

const statusStyle: Record<string, string> = {
  Settled: "bg-emerald-50 text-emerald-600",
  Processing: "bg-sky-50 text-sky-600",
  Refunded: "bg-rose-50 text-rose-500",
  Held: "bg-amber-50 text-amber-600",
};

const typeStyle: Record<string, string> = {
  Booking: "bg-accent-50 text-accent-600",
  Payout: "bg-violet-50 text-violet-600",
  Subscription: "bg-emerald-50 text-emerald-600",
  Refund: "bg-rose-50 text-rose-500",
};

function FinanceKPI({ label, value, sub, change, positive, icon: Icon, accent }: {
  label: string; value: string; sub: string; change: string; positive: boolean;
  icon: React.ElementType; accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100 hover:shadow-card-hover transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={clsx("w-9 h-9 rounded-xl flex items-center justify-center", accent)}>
          <Icon size={16} strokeWidth={2} className="text-white" />
        </div>
        <span className={clsx(
          "flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg",
          positive ? "text-emerald-600 bg-emerald-50" : "text-rose-500 bg-rose-50"
        )}>
          {positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
          {change}
        </span>
      </div>
      <p className="text-[24px] font-bold text-stone-900 leading-none tracking-tight">{value}</p>
      <p className="text-[12px] font-medium text-stone-600 mt-1">{label}</p>
      <p className="text-[11px] text-stone-400 mt-0.5">{sub}</p>
    </div>
  );
}

export default function FinancePage() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const revenueData = [42, 58, 51, 74, 63, 88, 72, 91, 68, 84, 95, 100];
  const payoutData  = [30, 42, 38, 55, 48, 66, 54, 70, 52, 64, 72, 78];

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar title="Financial Operations" subtitle="Transactions, payouts, commissions & revenue" />

      <div className="flex-1 p-8 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <FinanceKPI label="Platform Revenue" value="$284,920" sub="This month" change="+22.1%" positive icon={DollarSign} accent="bg-accent-gradient" />
          <FinanceKPI label="Total Payouts" value="$198,440" sub="Disbursed to creatives" change="+18.7%" positive icon={Wallet} accent="bg-gradient-to-br from-emerald-400 to-emerald-600" />
          <FinanceKPI label="Commission Earned" value="$28,492" sub="10% avg platform fee" change="+22.1%" positive icon={CreditCard} accent="bg-gradient-to-br from-sky-400 to-sky-600" />
          <FinanceKPI label="Pending Payouts" value="$14,280" sub="Scheduled this week" change="-4.2%" positive={false} icon={RefreshCw} accent="bg-gradient-to-br from-amber-400 to-amber-500" />
        </div>

        {/* Revenue vs Payout chart */}
        <div className="bg-white rounded-2xl p-6 shadow-card border border-stone-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[14px] font-semibold text-stone-900">Revenue vs Payouts</p>
              <p className="text-[12px] text-stone-400 mt-0.5">Monthly comparison — 2024</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-accent-500" />
                <span className="text-[12px] text-stone-500">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-emerald-400" />
                <span className="text-[12px] text-stone-500">Payouts</span>
              </div>
              <button className="flex items-center gap-1.5 text-[12px] text-stone-500 border border-stone-200 px-3 py-1.5 rounded-xl hover:border-stone-300 transition-all">
                <Download size={12} />
                Export
              </button>
            </div>
          </div>
          <div className="flex items-end gap-2 h-40">
            {revenueData.map((h, i) => (
              <div key={i} className="flex-1 flex items-end gap-0.5">
                <div
                  className={clsx("flex-1 rounded-t-md transition-all duration-500", i === 11 ? "bg-accent-500 shadow-glow-sm" : "bg-accent-200")}
                  style={{ height: `${h}%` }}
                />
                <div
                  className={clsx("flex-1 rounded-t-md transition-all duration-500", i === 11 ? "bg-emerald-400" : "bg-emerald-100")}
                  style={{ height: `${payoutData[i]}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3">
            {months.map(m => (
              <span key={m} className="text-[10px] text-stone-400 flex-1 text-center">{m}</span>
            ))}
          </div>
        </div>

        {/* Middle row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Payout schedule */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <p className="text-[14px] font-semibold text-stone-900 mb-1">Payout Schedule</p>
            <p className="text-[12px] text-stone-400 mb-4">Upcoming disbursements</p>
            <div className="space-y-3">
              {[
                { name: "Alex Chen", amount: "$2,140", date: "Dec 20", status: "Scheduled" },
                { name: "Priya Nair", amount: "$1,280", date: "Dec 20", status: "Scheduled" },
                { name: "Yuki Tanaka", amount: "$3,400", date: "Dec 21", status: "Processing" },
                { name: "Zara Ahmed", amount: "$890", date: "Dec 22", status: "Scheduled" },
                { name: "Marcus Lee", amount: "$640", date: "Dec 22", status: "On Hold" },
              ].map(({ name, amount, date, status }) => (
                <div key={name} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                  <div>
                    <p className="text-[12.5px] font-medium text-stone-800">{name}</p>
                    <p className="text-[11px] text-stone-400">{date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-bold text-stone-900">{amount}</p>
                    <span className={clsx(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-lg",
                      status === "Scheduled" ? "bg-sky-50 text-sky-600" :
                      status === "Processing" ? "bg-amber-50 text-amber-600" :
                      "bg-rose-50 text-rose-500"
                    )}>
                      {status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue breakdown */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <p className="text-[14px] font-semibold text-stone-900 mb-1">Revenue Breakdown</p>
            <p className="text-[12px] text-stone-400 mb-5">By source this month</p>
            <div className="space-y-4">
              {[
                { label: "Booking Commissions", value: "$18,420", pct: 65, color: "bg-accent-500" },
                { label: "Subscriptions", value: "$7,840", pct: 28, color: "bg-sky-400" },
                { label: "Featured Listings", value: "$1,960", pct: 7, color: "bg-emerald-400" },
              ].map(({ label, value, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[12px] text-stone-600">{label}</span>
                    <span className="text-[12px] font-semibold text-stone-800">{value}</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className={clsx("h-full rounded-full", color)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 grid grid-cols-2 gap-3">
              <div className="bg-accent-50 rounded-xl p-3">
                <p className="text-[11px] text-accent-600 font-medium">Net Margin</p>
                <p className="text-[18px] font-bold text-accent-700 mt-0.5">34.2%</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3">
                <p className="text-[11px] text-emerald-600 font-medium">MoM Growth</p>
                <p className="text-[18px] font-bold text-emerald-700 mt-0.5">+22.1%</p>
              </div>
            </div>
          </div>

          {/* Subscription tiers */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <p className="text-[14px] font-semibold text-stone-900 mb-1">Subscriptions</p>
            <p className="text-[12px] text-stone-400 mb-4">Active plan distribution</p>
            <div className="space-y-3">
              {[
                { plan: "Pro", price: "$49/mo", count: 842, color: "bg-accent-500", pct: 52 },
                { plan: "Studio", price: "$99/mo", count: 421, color: "bg-sky-400", pct: 26 },
                { plan: "Enterprise", price: "$249/mo", count: 184, color: "bg-emerald-400", pct: 11 },
                { plan: "Free", price: "$0/mo", count: 1794, color: "bg-stone-300", pct: 11 },
              ].map(({ plan, price, count, color, pct }) => (
                <div key={plan} className="flex items-center gap-3">
                  <div className={clsx("w-2 h-2 rounded-full flex-shrink-0", color)} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-[12px] font-medium text-stone-700">{plan} <span className="text-stone-400 font-normal">{price}</span></span>
                      <span className="text-[12px] font-semibold text-stone-800">{count}</span>
                    </div>
                    <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div className={clsx("h-full rounded-full", color)} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100">
              <p className="text-[11px] text-stone-400">Monthly subscription revenue</p>
              <p className="text-[20px] font-bold text-stone-900 mt-0.5">$7,840</p>
            </div>
          </div>
        </div>

        {/* Transactions table */}
        <div className="bg-white rounded-2xl shadow-card border border-stone-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold text-stone-900">Transaction Ledger</p>
              <p className="text-[12px] text-stone-400 mt-0.5">All platform financial activity</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-[12px] text-stone-500 border border-stone-200 px-3 py-1.5 rounded-xl hover:border-stone-300 transition-all">
                <Filter size={12} />
                Filter
              </button>
              <button className="flex items-center gap-1.5 text-[12px] text-stone-500 border border-stone-200 px-3 py-1.5 rounded-xl hover:border-stone-300 transition-all">
                <Download size={12} />
                Export CSV
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                {["ID","Type","From","To","Amount","Commission","Date","Status"].map(h => (
                  <th key={h} className="py-2.5 px-4 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id} className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors">
                  <td className="py-3 px-4 text-[12px] font-mono text-stone-500">{t.id}</td>
                  <td className="py-3 px-4">
                    <span className={clsx("text-[11px] font-semibold px-2.5 py-1 rounded-lg", typeStyle[t.type] ?? "bg-stone-100 text-stone-500")}>
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[12.5px] text-stone-600">{t.from}</td>
                  <td className="py-3 px-4 text-[12.5px] text-stone-600">{t.to}</td>
                  <td className={clsx("py-3 px-4 text-[12.5px] font-bold", t.amount.startsWith("+") ? "text-emerald-600" : "text-rose-500")}>
                    {t.amount}
                  </td>
                  <td className="py-3 px-4 text-[12.5px] text-stone-500">{t.commission}</td>
                  <td className="py-3 px-4 text-[12px] text-stone-400">{t.date}</td>
                  <td className="py-3 px-4">
                    <span className={clsx("text-[11px] font-semibold px-2.5 py-1 rounded-lg", statusStyle[t.status] ?? "bg-stone-100 text-stone-500")}>
                      {t.status}
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
