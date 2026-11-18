
import type { ReactNode } from "react";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import AuthGuard from "@/contexts/auth/AuthGuard";

import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar";

export default function DashboardLayout({children,}:{children:ReactNode}){
    return(
        <>
        {/* <div>
            <div>
                <DashboardNavbar/>
            </div>
            <div>
                {children}
            </div>
        </div> */}
        
        <AuthProvider>
            <AuthGuard> 
                <div>
                     <DashboardNavbar />
                 </div> 
                <main>
                    {children}
                </main>
            </AuthGuard>
        </AuthProvider>
        </>
    );
};
