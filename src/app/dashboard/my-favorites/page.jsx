"use client";

import { Card, Button } from "@heroui/react";

export default function MyFavoritesPage() {
  const favorites = [
    { title: "Never give up mindset", category: "Motivation" },
    { title: "Hard times build strong people", category: "Life" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {favorites.map((item, i) => (
          <Card key={i} className="bg-white/5 border border-white/10">
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm opacity-60">{item.category}</p>

              <Button size="sm" color="danger" className="mt-3">
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}