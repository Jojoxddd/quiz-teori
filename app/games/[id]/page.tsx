"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

interface Game {
  id: number;
  name: string;
  genre: string;
  rating: number;
  image?: string;
  description?: string;
}

export default function GameDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGame = async () => {
      const res = await fetch(`/api/games/${params.id}`);
      const data = await res.json();

      setGame(data);
      setLoading(false);
    };

    loadGame();
  }, [params.id]);

  if (loading)
    return (
      <div className="container text-light">
        <p>Loading...</p>
      </div>
    );

  if (!game)
    return (
      <div className="container text-light">
        <p>Game tidak ditemukan.</p>
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="container py-5 text-light">
        <div
          className="card p-4 text-light"
          style={{
            background: "#1a1a1a",
            border: "1px solid #7a00ff",
            boxShadow: "0 0 12px #7a00ff88",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          {/* Judul */}
          <h2 className="fw-bold mb-3" style={{ color: "#b666ff" }}>
            {game.name}
          </h2>

          {/* Gambar */}
          {game.image && (
            <Image
              src={game.image}
              alt={game.name}
              className="img-fluid rounded mb-4"
              style={{
                border: "1px solid #7a00ff",
                maxHeight: "300px",
                objectFit: "cover",
              }}
            />
          )}

          {/* Detail */}
          <p>
            <strong>Genre:</strong> {game.genre}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {game.rating}/10
          </p>

          {/* Deskripsi */}
          <p className="mt-3">{game.description}</p>

          {/* Tombol kembali */}
          <Link href="/games" className="btn btn-secondary mt-4">
            Kembali ke Daftar Game
          </Link>
        </div>
      </div>
    </>
  );
}
