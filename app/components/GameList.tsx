"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Game {
  id: number;
  name: string;
  genre: string;
  rating: number;
  image?: string;
  description?: string;
}

export default function GameList() {
  const [games, setGames] = useState<Game[]>([]);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------
  // GET DATA DARI API
  // ---------------------------------------------------
  const fetchGames = async () => {
    const res = await fetch("/api/games");
    const data = await res.json();
    setGames(data);
    setLoading(false);
  };

  useEffect(() => {
  const load = async () => {
    const res = await fetch("/api/games");
    const data = await res.json();
    setGames(data);
    setLoading(false);
  };

  load();   // aman → ini di dalam effect, bukan fungsi luar
}, []);


  // ---------------------------------------------------
  // CREATE GAME
  // ---------------------------------------------------
  const addGame = async (e: React.FormEvent) => {
    e.preventDefault();

    const newGame = {
      name,
      genre,
      rating,
      image,
      description,
    };

    await fetch("/api/games", {
      method: "POST",
      body: JSON.stringify(newGame),
    });

    setName("");
    setGenre("");
    setRating(0);
    setImage("");
    setDescription("");

    fetchGames();
  };

  // ---------------------------------------------------
  // DELETE GAME
  // ---------------------------------------------------
  const deleteGame = async (id: number) => {
    await fetch(`/api/games/${id}`, {
      method: "DELETE",
    });

    fetchGames();
  };

  return (
    <div className="container py-4 text-light">

      <h2 className="fw-bold mb-4" style={{ color: "#b666ff" }}>
       Daftar Game Favorit (Database)
      </h2>

      {/* FORM TAMBAH GAME */}
      <form
        onSubmit={addGame}
        className="card p-4 mb-4"
        style={{
          background: "#1a1a1a",
          border: "1px solid #7a00ff",
          boxShadow: "0 0 10px #7a00ff44",
        }}
      >
        <h4 style={{ color: "#b666ff" }}>Tambah Game Baru</h4>

        <div className="mb-3">
          <label className="form-label">Nama Game</label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Genre</label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rating (1 - 10)</label>
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
            type="text"
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
          Simpan Game
        </button>
      </form>

      {/* LIST GAME */}
      {loading ? (
        <p>Loading...</p>
      ) : games.length === 0 ? (
        <p>Belum ada game disimpan.</p>
      ) : (
        <div className="row">
          {games.map((game) => (
            <div className="col-md-4 mb-4" key={game.id}>
              <div
                className="card p-3 text-light"
                style={{
                  background: "#222",
                  border: "1px solid #7a00ff",
                  boxShadow: "0 0 10px #7a00ff55",
                }}
              >
                {game.image && (
                  <Image
                    src={game.image}
                    alt={game.name}
                    className="img-fluid rounded mb-3"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                )}

                <h5 style={{ color: "#b666ff" }}>{game.name}</h5>
                <p className="text-secondary">{game.genre}</p>
                <p>⭐ {game.rating}/10</p>

                <p style={{ fontSize: "14px" }}>
                  {game.description?.substring(0, 80)}...
                </p>

                <button
                  onClick={() => deleteGame(game.id)}
                  className="btn btn-danger btn-sm mt-3"
                >
                  Hapus
                </button>

                <a href={`/games/edit/${game.id}`} className="btn btn-warning btn-sm mt-2">
                  Edit
                </a>

              <a href={`/games/${game.id}`} className="btn btn-info btn-sm mt-2">
                  Detail
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
