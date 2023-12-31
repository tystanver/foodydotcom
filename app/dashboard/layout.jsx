"use client"
import "../globals.css";
import { Inter } from "next/font/google";
import DashboardTopNav from "./DashboardTopNavbar/page";
import DashboardAsidebar from "./DashboardAsidebar/page";
import { SnackbarProvider } from "notistack";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
      <SnackbarProvider maxSnack={3}>
        <DashboardTopNav />
        <div className="flex">
          <div className="">
            <DashboardAsidebar />
          </div>
          {children}
        </div>
        </SnackbarProvider>
      </body>
    </html>
  );
}
