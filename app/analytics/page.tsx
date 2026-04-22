"use client";
import TopBar from "@/components/TopBar";
import { TrendingUp, TrendingDown, MapPin, ArrowUpRight, Star } from "lucide-react";
import clsx from "clsx";

function MiniBar({ data, color = "bg-accent-400" }: { data: number[]; color?: string }) {
  return (
    <div className="flex items-end gap-0.5 w-full h-12">
      {data.map((h, i) => (
        <div key={i} className={clsx("flex-1 rounded-sm", color)} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

function MetricCard({
  label, value, change, positive, data, color, barColor,
}: {
  label: string; value: string; change: string; positive: boolean;
  data: number[]; color: string; barColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100 hover:shadow-card-hover transition-all">
      <div className="flex items-start justify-between mb-3">
        <p className="text-[12.5px] font-medium text-stone-500">{label}</p>
        <span className={clsx(
          "flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg",
          positive ? "text-emerald-600 bg-emerald-50" : "text-rose-500 bg-rose-50"
        )}>
          {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {change}
        </span>
      </div>
      <p className={clsx("text-[26px] font-bold leading-none tracking-tight", color)}>{value}</p>
      <div className="mt-4">
        <MiniBar data={data} color={barColor} />
      </div>
    </div>
  );
}

function RegionRow({ region, bookings, revenue, growth, pct }: {
  region: string; bookings: number; revenue: string; growth: string; pct: number;
}) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-stone-50 last:border-0">
      <div className="flex items-center gap-2 w-36">
        <MapPin size={12} className="text-stone-400 flex-shrink-0" />
        <span className="text-[12.5px] font-medium text-stone-700">{region}</span>
      </div>
      <div className="flex-1">
        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-accent-gradient" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <span className="text-[12px] text-stone-600 w-16 text-right">{bookings.toLocaleString()}</span>
      <span className="text-[12px] font-semibold text-stone-800 w-20 text-right">{revenue}</span>
      <span className={clsx(
        "text-[11px] font-semibold px-2 py-0.5 rounded-lg w-16 text-center",
        growth.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
      )}>
        {growth}
      </span>
    </div>
  );
}

function ServiceRow({ rank, service, bookings, revenue, rating, trend }: {
  rank: number; service: string; bookings: number; revenue: string; rating: number; trend: string;
}) {
  return (
    <tr className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors">
      <td className="py-3 px-4 text-[12px] font-bold text-stone-300">#{rank}</td>
      <td className="py-3 px-4 text-[12.5px] font-medium text-stone-800">{service}</td>
      <td className="py-3 px-4 text-[12.5px] text-stone-600">{bookings.toLocaleString()}</td>
      <td className="py-3 px-4 text-[12.5px] font-semibold text-stone-800">{revenue}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <span className="text-[12.5px] font-semibold text-stone-800">{rating}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className={clsx(
          "text-[11px] font-semibold px-2.5 py-1 rounded-lg",
          trend.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
        )}>
          {trend}
        </span>
      </td>
    </tr>
  );
}

export default function AnalyticsPage() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const userGrowth   = [30,42,38,55,48,66,58,74,62,80,88,100];
  const bookingData  = [45,58,50,72,60,84,70,90,75,88,94,100];
  const retentionD   = [72,74,71,76,75,78,77,80,79,82,84,86];
  const engageD      = [55,60,58,65,62,70,68,74,72,78,80,85];

  const cohorts = [
    { cohort: "Jan 2024", m1: 92, m3: 84, m6: 78, m12: 71 },
    { cohort: "Apr 2024", m1: 94, m3: 87, m6: 81, m12: null },
    { cohort: "Jul 2024", m1: 95, m3: 89, m6: null, m12: null },
    { cohort: "Oct 2024", m1: 96, m3: null, m6: null, m12: null },
  ];

  const funnel = [
    { stage: "Visitors",      value: "84,200", pct: 100, color: "bg-stone-200" },
    { stage: "Signups",       value: "28,410", pct: 34,  color: "bg-accent-200" },
    { stage: "Profile Views", value: "18,640", pct: 22,  color: "bg-accent-300" },
    { stage: "Enquiries",     value: "9,820",  pct: 12,  color: "bg-accent-400" },
    { stage: "Bookings",      value: "4,284",  pct: 5,   color: "bg-accent-500" },
  ];

  const engagementPanels = [
    {
      title: "Platform Engagement",
      sub: "Avg session & interaction metrics",
      items: [
        { label: "Avg Session Duration", value: "8m 42s", change: "+12%", up: true },
        { label: "Pages per Session",    value: "6.4",    change: "+8%",  up: true },
        { label: "Bounce Rate",          value: "24.1%",  change: "-3%",  up: true },
        { label: "Return Visitors",      value: "68.4%",  change: "+7%",  up: true },
      ],
    },
    {
      title: "Creative Activity",
      sub: "Profile & portfolio engagement",
      items: [
        { label: "Profile Views / Day",  value: "18,640", change: "+21%", up: true },
        { label: "Portfolio Opens",      value: "9,820",  change: "+16%", up: true },
        { label: "Enquiry Rate",         value: "52.7%",  change: "+4%",  up: true },
        { label: "Avg Response Time",    value: "1h 24m", change: "-18%", up: true },
      ],
    },
    {
      title: "Platform Health",
      sub: "System & operational metrics",
      items: [
        { label: "Uptime (30d)",    value: "99.98%", change: "+0.01%", up: true },
        { label: "Avg Load Time",   value: "1.2s",   change: "-0.3s",  up: true },
        { label: "Error Rate",      value: "0.04%",  change: "-0.02%", up: true },
        { label: "Support Tickets", value: "142",    change: "-8%",    up: true },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar title="Platform Analytics" subtitle="Growth, engagement, retention & operational insights" />

      <div className="flex-1 p-8 space-y-6">

        {/* Top metric cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard label="User Growth"       value="28,410" change="+31.5%" positive data={userGrowth}  color="text-accent-600"  barColor="bg-accent-300" />
          <MetricCard label="Booking Volume"    value="12,847" change="+18.4%" positive data={bookingData} color="text-emerald-600" barColor="bg-emerald-300" />
          <MetricCard label="Creator Retention" value="86%"    change="+4.2%"  positive data={retentionD}  color="text-sky-600"     barColor="bg-sky-300" />
          <MetricCard label="Engagement Rate"   value="68.4%"  change="+7.1%"  positive data={engageD}     color="text-violet-600"  barColor="bg-violet-300" />
        </div>

        {/* Growth chart + funnel */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-card border border-stone-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[14px] font-semibold text-stone-900">User &amp; Booking Growth</p>
                <p className="text-[12px] text-stone-400 mt-0.5">Monthly active users vs bookings — 2024</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-accent-400" />
                  <span className="text-[12px] text-stone-500">Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-emerald-400" />
                  <span className="text-[12px] text-stone-500">Bookings</span>
                </div>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-40">
              {userGrowth.map((h, i) => (
                <div key={i} className="flex-1 flex items-end gap-0.5">
                  <div
                    className={clsx("flex-1 rounded-t-sm transition-all duration-500", i === 11 ? "bg-accent-500" : "bg-accent-100")}
                    style={{ height: `${h}%` }}
                  />
                  <div
                    className={clsx("flex-1 rounded-t-sm transition-all duration-500", i === 11 ? "bg-emerald-400" : "bg-emerald-100")}
                    style={{ height: `${bookingData[i]}%` }}
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

          {/* Conversion funnel */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <p className="text-[14px] font-semibold text-stone-900 mb-1">Conversion Funnel</p>
            <p className="text-[12px] text-stone-400 mb-5">Visitor → Booking</p>
            <div className="space-y-3">
              {funnel.map(({ stage, value, pct, color }) => (
                <div key={stage}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[12px] text-stone-600 font-medium">{stage}</span>
                    <span className="text-[12px] font-semibold text-stone-800">{value}</span>
                  </div>
                  <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div className={clsx("h-full rounded-full", color)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100">
              <p className="text-[11px] text-stone-400">Overall conversion rate</p>
              <p className="text-[22px] font-bold text-accent-600 mt-0.5">5.09%</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                <TrendingUp size={11} /> +0.8pp vs last month
              </p>
            </div>
          </div>
        </div>

        {/* Regional + retention */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-card border border-stone-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[14px] font-semibold text-stone-900">Regional Activity</p>
                <p className="text-[12px] text-stone-400 mt-0.5">Bookings &amp; revenue by region</p>
              </div>
              <button className="text-[12px] text-accent-600 font-medium hover:text-accent-700 flex items-center gap-1">
                Full map <ArrowUpRight size={12} />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-3 pb-2 border-b border-stone-100">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide w-36">Region</span>
              <span className="flex-1 text-[11px] font-semibold text-stone-400 uppercase tracking-wide">Share</span>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide w-16 text-right">Bookings</span>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide w-20 text-right">Revenue</span>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide w-16 text-center">Growth</span>
            </div>
            <RegionRow region="New York"    bookings={3420} revenue="$84,200" growth="+24%" pct={100} />
            <RegionRow region="Los Angeles" bookings={2810} revenue="$71,400" growth="+18%" pct={82} />
            <RegionRow region="Chicago"     bookings={1640} revenue="$38,900" growth="+31%" pct={48} />
            <RegionRow region="Miami"       bookings={1280} revenue="$29,100" growth="+42%" pct={37} />
            <RegionRow region="Austin"      bookings={980}  revenue="$21,800" growth="+58%" pct={29} />
            <RegionRow region="Seattle"     bookings={720}  revenue="$16,400" growth="-3%"  pct={21} />
          </div>

          {/* Retention cohort */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <p className="text-[14px] font-semibold text-stone-900 mb-1">Creator Retention</p>
            <p className="text-[12px] text-stone-400 mb-4">Monthly cohort retention</p>
            <div className="space-y-4">
              {cohorts.map(({ cohort, m1, m3, m6, m12 }) => (
                <div key={cohort}>
                  <p className="text-[11px] text-stone-400 mb-1.5">{cohort}</p>
                  <div className="flex gap-1">
                    {([{ l: "M1", v: m1 }, { l: "M3", v: m3 }, { l: "M6", v: m6 }, { l: "M12", v: m12 }]).map(({ l, v }) => (
                      <div key={l} className="flex-1 text-center">
                        <div className={clsx(
                          "rounded-lg py-1.5 text-[11px] font-semibold",
                          v === null ? "bg-stone-50 text-stone-300" :
                          v >= 90   ? "bg-emerald-100 text-emerald-700" :
                          v >= 80   ? "bg-accent-100 text-accent-700" :
                                      "bg-amber-50 text-amber-600"
                        )}>
                          {v !== null ? `${v}%` : "—"}
                        </div>
                        <p className="text-[10px] text-stone-400 mt-1">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100">
              <p className="text-[11px] text-stone-400">12-month avg retention</p>
              <p className="text-[22px] font-bold text-accent-600 mt-0.5">86%</p>
            </div>
          </div>
        </div>

        {/* Service popularity */}
        <div className="bg-white rounded-2xl shadow-card border border-stone-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold text-stone-900">Service Popularity</p>
              <p className="text-[12px] text-stone-400 mt-0.5">Top services by booking volume this quarter</p>
            </div>
            <button className="text-[12px] text-accent-600 font-medium hover:text-accent-700 flex items-center gap-1">
              Full breakdown <ArrowUpRight size={12} />
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                {["#","Service","Bookings","Revenue","Avg Rating","Trend"].map(h => (
                  <th key={h} className="py-2.5 px-4 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <ServiceRow rank={1} service="Wedding Photography" bookings={3840} revenue="$184,200" rating={4.9} trend="+22%" />
              <ServiceRow rank={2} service="Portrait Sessions"   bookings={2610} revenue="$62,400"  rating={4.8} trend="+14%" />
              <ServiceRow rank={3} service="Event Videography"   bookings={1920} revenue="$96,000"  rating={4.7} trend="+31%" />
              <ServiceRow rank={4} service="Brand & Product"     bookings={1480} revenue="$74,000"  rating={4.6} trend="+18%" />
              <ServiceRow rank={5} service="Headshots"           bookings={1240} revenue="$24,800"  rating={4.7} trend="+9%"  />
              <ServiceRow rank={6} service="Real Estate"         bookings={840}  revenue="$42,000"  rating={4.5} trend="-4%"  />
            </tbody>
          </table>
        </div>

        {/* Engagement panels */}
        <div className="grid grid-cols-3 gap-4">
          {engagementPanels.map(({ title, sub, items }) => (
            <div key={title} className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
              <p className="text-[14px] font-semibold text-stone-900 mb-0.5">{title}</p>
              <p className="text-[12px] text-stone-400 mb-4">{sub}</p>
              <div className="space-y-3">
                {items.map(({ label, value, change, up }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                    <span className="text-[12px] text-stone-500">{label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-stone-900">{value}</span>
                      <span className={clsx(
                        "text-[10px] font-semibold px-1.5 py-0.5 rounded-md",
                        up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
                      )}>
                        {change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
