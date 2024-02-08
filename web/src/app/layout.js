import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";
import NavMenu from '@/components/NavMenu'
import UserPanel from "@/components/UserPanel";
import Head from "next/head";
import AuthContext from '@/contexts/AuthContext';
import { useSession } from 'next-auth/react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, currentPath }) {

    const { data: session, status } = useSession();
    const userId = session?.user.userId;
    const accessToken = session?.accessToken;

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <main className="app-container min-h-dvh max-w-3xl mx-auto bg-background text-primary-text flex flex-col relative z-0">
            <Head>
                <link rel="icon" href="/fav-icon.svg" />
            </Head>
            <AuthContext.Provider value={ { accessToken, userId } }>
                <UserPanel />
                <div className="flex flex-1 h-full">
                    { children }
                </div>
            </AuthContext.Provider>


            <NavMenu currentPath={ currentPath } />
        </main>
    );
}