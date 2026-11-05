import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DayValue } from "@/types";
import { weekdayShort, formatDayMonth } from "@/lib/date";
import { windowValues } from "@/lib/stats";
import { useLocale } from "@/i18n";

const INK = "#0B0B0C";
const MUTED = "#6B6B70";
const GRID = "rgba(11, 11, 12, 0.08)";

/** Minutes spent studying per day, last 7 days. */
export function StudyTimeChart({ data }: { data: DayValue[] }) {
  const { t, locale } = useLocale();
  const chartData = windowValues(data, 7).map((d) => ({
    ...d,
    day: weekdayShort(d.date, locale),
    full: formatDayMonth(d.date, locale),
  }));
  const unit = t("x.parent.minutesShort");

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="studyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={INK} stopOpacity={0.16} />
              <stop offset="100%" stopColor={INK} stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={GRID} strokeDasharray="3 3" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: MUTED }} />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={52}
            allowDecimals={false}
            tick={{ fontSize: 11, fill: MUTED }}
            tickFormatter={(v: number) => `${v} ${unit}`}
          />
          <Tooltip
            cursor={{ stroke: INK, strokeWidth: 1, strokeOpacity: 0.3 }}
            contentStyle={{ borderRadius: 12, border: `1px solid ${GRID}`, fontSize: 12 }}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.full ?? ""}
            formatter={(value: number) => [`${value} ${unit}`, t("x.parent.chartLabel")]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={INK}
            strokeWidth={2}
            fill="url(#studyFill)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
