"use client";
import TopBar from "@/components/TopBar";
import {
  AlertTriangle, Clock, CheckCircle, XCircle, MessageSquare,
  Paperclip, User, Camera, ChevronRight, ArrowUpRight, Shield,
  RefreshCw, Flag
} from "lucide-react";
import clsx from "clsx";

const disputes = [
  {
    id: "#DSP-4821",
    title: "Deliverables not received after payment",
    client: "Nina P.",
    creative: "Carlos Vega",
    service: "Brand Video",
    amount: "$3,100",
    opened: "Dec 15, 2024",
    status: "Open",
    priority: "High",
    messages: 8,
    evidence: 3,
    timeline: [
      { event: "Dispute opened by client", time: "Dec 15, 10:22 AM", type: "open" },
      { event: "Admin notified creative", time: "Dec 15, 11:05 AM", type: "action" },
      { event: "Creative responded — delivery delayed", time: "Dec 16, 9:14 AM", type: "message" },
      { event: "Client uploaded evidence (3 files)", time: "Dec 16, 2:30 PM", type: "evidence" },
      { event: "Under admin review", time: "Dec 17, 10:00 AM", type: "review" },
    ],
  },
  {
    id: "#DSP-4820",
    title: "Photo quality below agreed standard",
    client: "James K.",
    creative: "Priya Nair",
    service: "Portrait Session",
    amount: "$350",
    opened: "Dec 14, 2024",
    status: "Under Review",
    priority: "Medium",
    messages: 12,
    evidence: 5,
    timeline: [
      { event: "Dispute opened by client", time: "Dec 14, 3:10 PM", type: "open" },
      { event: "Creative submitted revised deliverables", time: "Dec 15, 8:45 AM", type: "action" },
      { event: "Client rejected revisions", time: "Dec 15, 4:20 PM", type: "message" },
      { event: "Escalated to senior admin", time: "Dec 16, 9:00 AM", type: "review" },
    ],
  },
  {
    id: "#DSP-4819",
    title: "No-show at scheduled event",
    client: "Tom B.",
    creative: "Marcus Lee",
    service: "Event Photography",
    amount: "$800",
    opened: "Dec 12, 2024",
    status: "Resolved",
    priority: "High",
    messages: 6,
    evidence: 2,
    timeline: [
      { event: "Dispute opened by client", time: "Dec 12, 6:00 PM", type: "open" },
      { event: "Creative confirmed no-show", time: "Dec 13, 10:00 AM", type: "action" },
      { event: "Full refund issued to client", time: "Dec 13, 2:00 PM", type: "resolved" },
    ],
  },
  {
    id: "#DSP-4818",
    title: "Unauthorized use of client images",
    client: "Olivia R.",
    creative: "Alex Chen",
    service: "Wedding Photography",
    amount: "$1,200",
    opened: "Dec 10, 2024",
    status: "Escalated",
    priority: "Critical",
    messages: 18,
    evidence: 7,
    timeline: [
      { event: "Dispute opened by client", time: "Dec 10, 11:00 AM", type: "open" },
      { event: "Legal team notified", time: "Dec 10, 12:30 PM", type: "action" },
      { event: "Creative account temporarily suspended", time: "Dec 11, 9:00 AM", type: "review" },
      { event: "Evidence review in progress", time: "Dec 12, 10:00 AM", type: "evidence" },
    ],
  },
];

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  Open: { color: "bg-amber-50 text-amber-600", icon: Clock },
  "Under Review": { color: "bg-sky-50 text-sky-600", icon: RefreshCw },
  Resolved: { color: "bg-emerald-50 text-emerald-600", icon: CheckCircle },
  Escalated: { color: "bg-rose-50 text-rose-500", icon: AlertTriangle },
};

const priorityConfig: Record<string, string> = {
  Critical: "bg-rose-500 text-white",
  High: "bg-amber-500 text-white",
  Medium: "bg-sky-400 text-white",
  Low: "bg-stone-300 text-stone-700",
};

const timelineTypeConfig: Record<string, { color: string; dot: string }> = {
  open: { color: "text-amber-600", dot: "bg-amber-400" },
  action: { color: "text-sky-600", dot: "bg-sky-400" },
  message: { color: "text-stone-600", dot: "bg-stone-400" },
  evidence: { color: "text-violet-600", dot: "bg-accent-400" },
  review: { color: "text-accent-600", dot: "bg-accent-500" },
  resolved: { color: "text-emerald-600", dot: "bg-emerald-400" },
};

function DisputeCard({ d }: { d: typeof disputes[0] }) {
  const s = statusConfig[d.status];
  const StatusIcon = s.icon;
  return (
    <div className={clsx(
      "bg-white rounded-2xl p-5 shadow-card border transition-all duration-200 hover:shadow-card-hover",
      d.priority === "Critical" ? "border-rose-200" : "border-stone-100"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-stone-400">{d.id}</span>
          <span className={clsx("text-[10px] font-bold px-2 py-0.5 rounded-md", priorityConfig[d.priority])}>
            {d.priority}
          </span>
        </div>
        <span className={clsx("flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg", s.color)}>
          <StatusIcon size={11} strokeWidth={2.5} />
          {d.status}
        </span>
      </div>

      <h3 className="text-[13.5px] font-semibold text-stone-900 mb-3 leading-snug">{d.title}</h3>

      {/* Parties */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-stone-50 rounded-xl">
        <div className="flex items-center gap-1.5">
          <User size={12} className="text-stone-400" />
          <span className="text-[12px] text-stone-600 font-medium">{d.client}</span>
        </div>
        <ChevronRight size={12} className="text-stone-300" />
        <div className="flex items-center gap-1.5">
          <Camera size={12} className="text-stone-400" />
          <span className="text-[12px] text-stone-600 font-medium">{d.creative}</span>
        </div>
        <span className="ml-auto text-[12px] font-bold text-stone-800">{d.amount}</span>
      </div>

      {/* Service + date */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] text-stone-500">{d.service}</span>
        <span className="text-[11px] text-stone-400">Opened {d.opened}</span>
      </div>

      {/* Timeline */}
      <div className="mb-4 space-y-2">
        {d.timeline.slice(-3).map((t, i) => {
          const tc = timelineTypeConfig[t.type];
          return (
            <div key={i} className="flex items-start gap-2.5">
              <div className={clsx("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", tc.dot)} />
              <div className="flex-1">
                <p className={clsx("text-[11.5px]", tc.color)}>{t.event}</p>
                <p className="text-[10.5px] text-stone-400">{t.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] text-stone-400">
            <MessageSquare size={11} />
            {d.messages}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-stone-400">
            <Paperclip size={11} />
            {d.evidence}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {d.status !== "Resolved" && (
            <>
              <button className="px-3 py-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                Resolve
              </button>
              <button className="px-3 py-1.5 text-[11px] font-semibold text-accent-600 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors">
                Review
              </button>
            </>
          )}
          {d.status === "Resolved" && (
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle size={11} /> Closed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DisputesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar title="Dispute Resolution" subtitle="Client complaints, refund requests & moderation flags" />

      <div className="flex-1 p-8 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Open Disputes", value: "47", color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
            { label: "Under Review", value: "18", color: "text-sky-600", bg: "bg-sky-50", icon: RefreshCw },
            { label: "Escalated", value: "6", color: "text-rose-500", bg: "bg-rose-50", icon: AlertTriangle },
            { label: "Resolved (30d)", value: "124", color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle },
          ].map(({ label, value, color, bg, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-card border border-stone-100 flex items-center gap-4">
              <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", bg)}>
                <Icon size={18} className={color} strokeWidth={2} />
              </div>
              <div>
                <p className={clsx("text-[22px] font-bold leading-none", color)}>{value}</p>
                <p className="text-[12px] text-stone-500 mt-0.5 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {["All", "Open", "Under Review", "Escalated", "Resolved"].map(f => (
              <button
                key={f}
                className={clsx(
                  "px-4 py-2 rounded-xl text-[12.5px] font-medium transition-all",
                  f === "All"
                    ? "bg-accent-500 text-white shadow-glow-sm"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-accent-300 hover:text-accent-600"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-[12px] text-stone-500 border border-stone-200 px-3 py-2 rounded-xl hover:border-stone-300 transition-all bg-white">
              <Flag size={12} />
              Priority
            </button>
            <button className="flex items-center gap-1.5 text-[12px] text-accent-600 border border-accent-200 px-3 py-2 rounded-xl hover:bg-accent-50 transition-all bg-white font-medium">
              <Shield size={12} />
              Bulk Resolve
            </button>
          </div>
        </div>

        {/* Dispute cards */}
        <div className="grid grid-cols-2 gap-4">
          {disputes.map(d => <DisputeCard key={d.id} d={d} />)}
        </div>

        {/* Resolution stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <p className="text-[14px] font-semibold text-stone-900 mb-1">Resolution Rate</p>
            <p className="text-[12px] text-stone-400 mb-4">Last 30 days</p>
            <div className="flex items-end gap-1 h-20">
              {[60, 72, 68, 80, 75, 88, 82, 91, 85, 94, 90, 96].map((h, i) => (
                <div
                  key={i}
                  className={clsx("flex-1 rounded-sm", i === 11 ? "bg-emerald-400" : "bg-emerald-100")}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="text-[28px] font-bold text-emerald-600 mt-3">96%</p>
            <p className="text-[12px] text-stone-400">Avg resolution time: 2.4 days</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <p className="text-[14px] font-semibold text-stone-900 mb-1">Dispute Categories</p>
            <p className="text-[12px] text-stone-400 mb-4">By type this month</p>
            <div className="space-y-3">
              {[
                { label: "Deliverable Issues", pct: 42, color: "bg-amber-400" },
                { label: "No-show / Cancellation", pct: 28, color: "bg-rose-400" },
                { label: "Quality Disputes", pct: 18, color: "bg-sky-400" },
                { label: "Payment Issues", pct: 12, color: "bg-accent-400" },
              ].map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[12px] text-stone-600">{label}</span>
                    <span className="text-[12px] font-semibold text-stone-800">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div className={clsx("h-full rounded-full", color)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <p className="text-[14px] font-semibold text-stone-900 mb-1">Refunds Issued</p>
            <p className="text-[12px] text-stone-400 mb-4">Financial impact of disputes</p>
            <div className="space-y-3">
              {[
                { label: "Full Refunds", value: "$8,420", count: 14 },
                { label: "Partial Refunds", value: "$3,180", count: 22 },
                { label: "No Refund", value: "$0", count: 88 },
              ].map(({ label, value, count }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                  <div>
                    <p className="text-[12.5px] font-medium text-stone-700">{label}</p>
                    <p className="text-[11px] text-stone-400">{count} cases</p>
                  </div>
                  <p className="text-[13px] font-bold text-stone-900">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-stone-100">
              <p className="text-[11px] text-stone-400">Total refunded this month</p>
              <p className="text-[20px] font-bold text-rose-500 mt-0.5">$11,600</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
