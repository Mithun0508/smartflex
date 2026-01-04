"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(
  () => import("./Navbar"),
  { ssr: false }
);
console.log(
  "CLERK KEY EXISTS:",
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
);


export default function NavbarClient() {
  return <Navbar />;
}
