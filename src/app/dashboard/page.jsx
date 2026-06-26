import { getServertSession } from "@/lib/getData/session/serverSesson";
import { Card} from "@heroui/react";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const session= await getServertSession();
  const userRole=session?.user?.role;
  // console.log(userRole);
   if (userRole == "admin") {
    redirect("/dashboard/admin");
  } 
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/5 border border-white/10">
          <div>Total Lessons: 24</div>
        </Card>

        <Card className="bg-white/5 border border-white/10">
          <div>Saved: 8</div>
        </Card>

        <Card className="bg-white/5 border border-white/10">
          <div>Created: 12</div>
        </Card>

        <Card className="bg-white/5 border border-white/10">
          <div>Premium Status</div>
        </Card>
      </div>
    </div>
  );
}