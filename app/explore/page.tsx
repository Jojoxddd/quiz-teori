"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

interface ExternalGame {
  id: number;
  title: string;
  genre: string;
  thumbnail: string;
  short_description: string;
}

export default function ExplorePage() {
  const [games, setGames] = useState<ExternalGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.freetogame.com/api/games")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="container text-light py-4">
        <h2 className="fw-bold mb-4" style={{ color: "#ffffffff" }}>
        Explore Game dari API Publik
        </h2>

        {loading ? (
          <p>Loading game...</p>
        ) : (
          <div className="row">
            {games.slice(0, 12).map((game) => (
              <div className="col-md-4 mb-4" key={game.id}>
                <div
                  className="card p-3"
                  style={{
                    background: "#1a1a1a",
                    border: "1px solid #53bed8ff",
                    boxShadow: "0 0 10px #53bed8ff",
                  }}
                >
                  <Image
                    src={game.thumbnail}
                    alt={game.title}
                    className="img-fluid rounded mb-3"
                    style={{ height: "180px", objectFit: "cover" }}
                  />

                  <h5 className="fw-bold" style={{ color: "#53bed8ff" }}>
                    {game.title}
                  </h5>

                  <p className="text-secondary">{game.genre}</p>

                  <p style={{ fontSize: "14px" }}>
                    {game.short_description.substring(0, 80)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
