
import type { ReactNode } from "react";
import './globals.css'
import '@mantine/core/styles.css';
import { DM_Sans } from 'next/font/google';
import { createTheme, MantineProvider } from "@mantine/core";
import { AuthProvider } from "@/contexts/auth/AuthContext";

const dmSans = DM_Sans({
    subsets:["latin"],
    weight:['400', '500', '600', '700'],
    display:"swap",
});

const theme = createTheme({
    primaryColor:"indigo",
    defaultRadius:"md",
    fontFamily:"Poppins, DM Sans, Inter, sans-serif",
});

export default function RootLayout({children} : {children:ReactNode}){
    return(
        <html lang="en">
            <body className={dmSans.className}>
                <MantineProvider theme={theme}>
                    <AuthProvider>
                            {children}
                    </AuthProvider>
                </MantineProvider>
            </body>
        </html>
    );
};