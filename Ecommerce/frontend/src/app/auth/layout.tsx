
import './auth-style.css';
import type { ReactNode } from "react";
import Mainnavbar from "@/components/navigation/HomeNavbar";
import { AuthProvider } from "@/contexts/auth/AuthContext";

export default function AuthLayout({ children,}:{children:ReactNode}) {
  return (
    <div>
        <div className="bg-[#7494ec] ">
            <Mainnavbar/>
        </div>
    <div className="Auth-Container">
        <AuthProvider>
                {children}
        </AuthProvider>
    </div>
    </div>
  );
}