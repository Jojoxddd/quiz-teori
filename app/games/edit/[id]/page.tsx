"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Game {
  id: number;
  name: string;
  genre: string;
  rating: number;
  image?: string;
  description?: string;
}

export default function EditGamePage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // FETCH DATA GAME
  useEffect(() => {
    const loadGame = async () => {
      const res = await fetch(`/api/games/${params.id}`);
      const data = await res.json();

      if (data) {
        setGame(data);
        setName(data.name);
        setGenre(data.genre);
        setRating(data.rating);
        setImage(data.image || "");
        setDescription(data.description || "");
      }

      setLoading(false);
    };

    loadGame();
  }, [params.id]);

  // UPDATE GAME
  const updateGame = async (e: React.FormEvent) => {
    e.preventDefault();

    const updated = {
      name,
      genre,
      rating,
      image,
      description,
    };

    await fetch(`/api/games/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });

    router.push("/games"); // kembali ke list
  };

  if (loading) return <p className="container text-light">Loading...</p>;

  if (!game)
    return <p className="container text-light">Game tidak ditemukan.</p>;

  return (
    <div className="container py-4 text-light">
      <h2 className="fw-bold mb-4" style={{ color: "#b666ff" }}>
        ✏ Edit Game: {game.name}
      </h2>

      <form
        onSubmit={updateGame}
        className="card p-4"
        style={{
          background: "#1a1a1a",
          border: "1px solid #7a00ff",
          boxShadow: "0 0 12px #7a00ff55",
        }}
      >
        <div className="mb-3">
          <label className="form-label">Nama Game</label>
          <input
            className="form-control bg-dark text-light"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Genre</label>
          <input
            className="form-control bg-dark text-light"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rating (1–10)</label>
          <input
            type="number"
            className="form-control bg-dark text-light"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            className="form-control bg-dark text-light"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <textarea
            className="form-control bg-dark text-light"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" style={{ background: "#7a00ff" }}>
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
