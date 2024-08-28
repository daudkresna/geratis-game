"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const CategorySelect = ({
  category,
  platform,
}: {
  category: string;
  platform: string;
}) => {
  const categories: string =
    "mmorpg, shooter, strategy, moba, racing, sports, social, sandbox, open-world, survival, pvp, pve, pixel, voxel, zombie, turn-based, first-person, third-Person, top-down, tank, space, sailing, side-scroller, superhero, permadeath, card, battle-royale, mmo, mmofps, mmotps, 3d, 2d, anime, fantasy, sci-fi, fighting, action-rpg, action, military, martial-arts, flight, low-spec, tower-defense, horror, mmorts";

  // Memanggil library yang akan digunakan
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // menyimpan category dalam state

  const handlePlatform = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("platform", event.target.value);
    params.set("page", "1");
    console.log(params.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", event.target.value);
    params.set("page", "1");
    console.log(params.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex w-full flex-row justify-center gap-8">
      <select
        name="platform"
        id="platform"
        value={platform}
        onChange={handlePlatform}
      >
        <option value="pc">PC</option>
        <option value="browser">Browser</option>
      </select>
      <select
        name="category"
        id="category"
        value={category}
        onChange={handleSelect}
      >
        <option value="mmorpg">MMORPG</option>
        <option value="shooter">Shooter</option>
        <option value="strategy">Strategy</option>
      </select>
    </div>
  );
};

export default CategorySelect;
