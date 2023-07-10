import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "./navbar";
import { Fragment } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  navbar,
}: {
  children: React.ReactNode;
  navbar: Boolean;
}) {
  return (
    <Fragment>
      {navbar && <Navbar />}
      <main className={inter.className}>{children}</main>
    </Fragment>
  );
}
