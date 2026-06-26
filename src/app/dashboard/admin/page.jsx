import DashboardStats from "@/Components/Admin/DashboardStats";
import LessonGrowthChart from "@/Components/Admin/LessonGrowthChart";
import RecentReportsTable from "@/Components/Admin/RecentReportsTable";
import TopContributors from "@/Components/Admin/TopContributors";
import UserGrowthChart from "@/Components/Admin/UserGrowthChart";
import { getLessons, getUsers } from "@/lib/getData/data/lessons";
import { getReports } from "@/lib/getData/data/reports";
import { FaBookOpen, FaUsers } from "react-icons/fa";
import { FiAlertTriangle, FiTrendingUp } from "react-icons/fi";

// 🛠️ এই লাইনটি Next.js-কে বলবে বিল্ড করার সময় ব্যাকএন্ডে রিকোয়েস্ট না পাঠাতে
export const dynamic = "force-dynamic"; 

export default async function HomePage() {
  // ডাটা ফেচিং
  const users = await getUsers();
  const lessons = await getLessons();
  const reports = await getReports(); 

  // ⏰ ৩ লাইনের ডেট ফিল্টারিং কোড (টাইমজোন ইস্যু ছাড়া)
  const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
  const todaysLessons = lessons?.filter(lesson => {
    if (!lesson.createdAt) return false;
    const lessonDateStr = new Date(lesson.createdAt).toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
    return lessonDateStr === todayStr;
  }) || [];

  const stats = {
    totalUsers: users?.length || 0,
    totalLessons: lessons?.length || 0,
    totalReports: reports?.length || 0,
    todayLessons: todaysLessons?.length || 0,
  };

  const userGrowthData = [
    { date: "Mon", users: 12 },
    { date: "Tue", users: 18 },
    { date: "Wed", users: 22 },
    { date: "Thu", users: 30 },
    { date: "Fri", users: 36 },
    { date: "Sat", users: 42 },
    { date: "Sun", users: 50 },
  ];

  const lessonGrowthData = [
    { date: "Mon", lessons: 5 },
    { date: "Tue", lessons: 9 },
    { date: "Wed", lessons: 12 },
    { date: "Thu", lessons: 18 },
    { date: "Fri", lessons: 24 },
    { date: "Sat", lessons: 31 },
    { date: "Sun", lessons: 40 },
  ];

  const contributors = [
    { _id: "1", name: "Arafat Hosen", email: "arafat@gmail.com", lessonCount: 25 },
    { _id: "2", name: "Rahim", email: "rahim@gmail.com", lessonCount: 18 },
    { _id: "3", name: "Karim", email: "karim@gmail.com", lessonCount: 15 },
    { _id: "4", name: "Jamal", email: "jamal@gmail.com", lessonCount: 12 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-violet-500/10 to-cyan-500/20" />
          <div className="relative z-10">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-1 text-sm text-white">
              Admin Dashboard
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-white">
              Welcome Back 👋
            </h1>
            <p className="mt-3 text-slate-300 max-w-2xl">
              Monitor users, lessons, reports and platform performance from one powerful dashboard.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Total Users</p>
                <h2 className="text-4xl font-bold text-white mt-2">{stats.totalUsers}</h2>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-500/20">
                <FaUsers className="size-7 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Total Lessons</p>
                <h2 className="text-4xl font-bold text-white mt-2">{stats.totalLessons}</h2>
              </div>
              <div className="p-4 rounded-2xl bg-violet-500/20">
                <FaBookOpen className="size-7 text-violet-400" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Reports</p>
                <h2 className="text-4xl font-bold text-white mt-2">{stats.totalReports}</h2>
              </div>
              <div className="p-4 rounded-2xl bg-red-500/20">
                <FiAlertTriangle className="size-7 text-red-400" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Today's Lessons</p>
                <h2 className="text-4xl font-bold text-white mt-2">{stats.todayLessons}</h2>
              </div>
              <div className="p-4 rounded-2xl bg-green-500/20">
                <FiTrendingUp className="size-7 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <UserGrowthChart data={userGrowthData} />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <LessonGrowthChart data={lessonGrowthData} />
          </div>
        </div>

        {/* Insights */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Platform Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-slate-400">Growth Rate</p>
              <h3 className="text-4xl font-bold text-green-400 mt-2">+24%</h3>
            </div>
            <div>
              <p className="text-slate-400">Active Contributors</p>
              <h3 className="text-4xl font-bold text-cyan-400 mt-2">48</h3>
            </div>
            <div>
              <p className="text-slate-400">Premium Users</p>
              <h3 className="text-4xl font-bold text-violet-400 mt-2">128</h3>
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <TopContributors contributors={contributors} />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <RecentReportsTable reports={reports} />
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Recent Activities</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-3 h-3 rounded-full bg-green-500 mt-2"></div>
              <div>
                <p className="text-white font-medium">New user registered</p>
                <p className="text-sm text-slate-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-3 h-3 rounded-full bg-cyan-500 mt-2"></div>
              <div>
                <p className="text-white font-medium">New lesson published</p>
                <p className="text-sm text-slate-400">15 minutes ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-3 h-3 rounded-full bg-red-500 mt-2"></div>
              <div>
                <p className="text-white font-medium">Lesson reported</p>
                <p className="text-sm text-slate-400">30 minutes ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-3 h-3 rounded-full bg-violet-500 mt-2"></div>
              <div>
                <p className="text-white font-medium">Premium subscription purchased</p>
                <p className="text-sm text-slate-400">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}