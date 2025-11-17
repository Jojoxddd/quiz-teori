import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="container text-light py-5">
        <h1 className="fw-bold" style={{ color: "#53bed8ff" }}>
          Jonathan Daniel Hope
        </h1>
        <h4 className="text-secondary">535240106</h4>

        <p className="mt-3">Project: Daftar Game Favorit</p>

        <Link
          href="/games"
          className="btn fw-bold mt-4"
          style={{ background: "#53bed8ff", color: "white" }}
        >
          Masuk ke Daftar Game
        </Link>
      </div>
    </>
  );
}
