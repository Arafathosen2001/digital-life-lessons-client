import { redirect } from "next/navigation";
import { getServertSession } from "@/lib/getData/session/serverSesson";
import { getLessons } from "@/lib/getData/data/lessons";
import DashboardStats from "@/Components/user/DashboardStats";
import DashboardChart from "@/Components/user/DashboardChart";
import QuickActions from "@/Components/user/QuickActions";
import RecentLessons from "@/Components/user/RecentLessons";
import { serverFetch } from "@/lib/myApi/core/ferch";

export default async function DashboardHome() {
  const session = await getServertSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role === "admin") {
    redirect("/dashboard/admin");
  }

  const lessons = await getLessons();

  const saves = await serverFetch(
    `/api/saves?userId=${session.user.id}`
  );

  const myLessons = lessons.filter(
    (lesson) => lesson.userId === session.user.id
  );

  const totalLessons = myLessons.length;

  const totalSaved = saves.length;

  const recentLessons = [...myLessons]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <section className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold">
          Dashboard Overview
        </h2>

        <p className="text-default-500 mt-2">
          Welcome back, {session.user.name}
        </p>
      </div>

      <DashboardStats
  totalLessons={totalLessons}
  totalSaved={totalSaved}
  totalRecent={recentLessons.length}
  premium={session.user.isPremium}
/>

      {/* <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <DashboardChart
            lessons={myLessons}
          />
        </div>

        <QuickActions />

      </div>

      <RecentLessons
        lessons={recentLessons}
      /> */}

    </section>
  );
}