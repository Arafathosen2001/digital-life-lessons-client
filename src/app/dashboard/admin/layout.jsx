"use client";

import { useClientSession } from "@/lib/getData/session/session";

export default function DashboardLayout({ children }) {
  const { session ,isPending } = useClientSession();
  const user = session?.user;

  

  const isAdmin = user?.role === "admin";


  return (
    <div className="flex min-h-screen ">

     

      {/* Main Content */}
      {isPending ? (<>Loding...</>):!isAdmin ? (<>
      <h1>sorry you r not admin</h1>
      </>)
      :(<>
         <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
      </>)}
     
    </div>
  );
}