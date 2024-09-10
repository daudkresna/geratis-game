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
    "mmorpg,shooter,strategy,moba,racing,sports,social,sandbox,open-world,survival,pvp,pve,pixel,voxel,zombie,turn-based,first-person,third-Person,top-down,tank,space,sailing,side-scroller,superhero,permadeath,card,battle-royale,mmo,mmofps,mmotps,3d,2d,anime,fantasy,sci-fi,fighting,action-rpg,action,military,martial-arts,flight,low-spec,tower-defense,horror,mmorts";

  const categoriesList = categories.split(",");
  const uppercaseCategory = categoriesList.map((category) => {
    return category.toUpperCase();
  });

  console.log(uppercaseCategory);

  const toPascalCase = (s: string | null | undefined) =>
    s
      ? s.replace(/(\w)(\w*)/g, (_, p, q) => p.toUpperCase() + q.toLowerCase())
      : s;

  // Memanggil library yang akan digunakan
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // menyimpan category dalam state

  const handlePlatform = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("platform", event.target.value);
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", event.target.value);
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex w-full flex-row justify-center gap-8">
      <select
        className="btn rounded-md bg-primary text-start"
        name="platform"
        id="platform"
        value={platform}
        onChange={handlePlatform}
      >
        <option value="pc">PC</option>
        <option value="browser">Browser</option>
      </select>
      <select
        className="btn rounded-md bg-primary text-start"
        name="category"
        id="category"
        value={category}
        onChange={handleSelect}
      >
        {/* <option value="mmorpg">MMORPG</option>
        <option value="shooter">Shooter</option>
        <option value="strategy">Strategy</option> */}
        {categoriesList.map((category, index) => (
          <option key={category} value={category}>
            {uppercaseCategory[index]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
