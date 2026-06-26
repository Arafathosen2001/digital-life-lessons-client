"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function UserGrowthChart({ data }) {
  return (
    <div className="bg-content1 rounded-xl p-5 border">
      <h3 className="font-semibold mb-5">
        User Growth
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="users"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}