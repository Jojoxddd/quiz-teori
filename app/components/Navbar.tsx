"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="navbar px-4"
      style={{
        background: "#111",
        borderBottom: "1px solid #53bed8ff",
        boxShadow: "0px 0px 10px #53bed8ff",
      }}
    >   
      <Link href="/" className="navbar-brand text-light fw-bold" aria-label="Home">
        GameFav
      </Link>
    </nav>
  );
}
