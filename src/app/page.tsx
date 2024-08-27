import Link from "next/link";
import { GameData } from "../../type";
import GameCard from "./components/ui/GameCard";
import LongGameCard from "./components/ui/LongGameCard";
import Image from "next/image";
import SmallGameCard from "./components/ui/SmallGameCard";

export default async function Home() {
  const [newRelease, popular]: [GameData[], GameData[]] = await Promise.all([
    fetch(`${process.env.API_BASE_URL}/games?sort-by=release-date`).then(
      (res) => res.json(),
    ),
    fetch(`${process.env.API_BASE_URL}/games?sort-by=popular`).then((res) =>
      res.json(),
    ),
  ]);
  const filterNew: GameData[] = newRelease.slice(0, 5);
  const filterPopular: GameData[] = popular.slice(0, 3);
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-t from-base-100 to-transparent to-70%">
        <div className="absolute top-0 -z-10 w-full skew-x-6 opacity-70">
          <div className="grid grid-cols-5 gap-2 lg:grid-cols-4">
            {popular.slice(0, 10).map((game) => (
              <SmallGameCard src={game.thumbnail} key={game.id} />
            ))}
          </div>
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h1 className="z-10 text-4xl font-bold md:text-8xl">GERATIS</h1>
          <h3 className="relative z-10 text-xl text-secondary-content after:absolute after:-bottom-1 after:left-0 after:h-2 after:w-full after:bg-primary md:text-3xl">
            Cari, Favoritkan, Komentari
          </h3>
        </div>
      </div>

      {/* Game List */}
      <div className="relative flex min-h-fit flex-col justify-evenly gap-8 md:flex-row md:gap-0">
        {/* <div className="absolute z-10 h-full w-full bg-gradient-to-b from-base-300 to-base-100 opacity-30"></div> */}

        {/* <div className="absolute top-0 -z-10 h-1/4 w-full text-4xl">
          <div className="relative h-full w-full opacity-30">
            <Image
              alt="Logo"
              src={`${filterPopular[0]?.thumbnail}`}
              quality={100}
              fill
            />
          </div>
        </div> */}
        <div className="z-20 flex flex-col gap-4 px-2">
          <h1 className="font-bold">NEW RELEASE</h1>
          {filterNew.map((game) => (
            <Link href={`/game/${game.id}`} key={game.id}>
              <LongGameCard {...game} />
            </Link>
          ))}
          <div className="inline-flex justify-end">
            <Link href="/games">
              <button className="btn btn-accent w-36">Load More</button>
            </Link>
          </div>
        </div>
        <div className="relative z-20 flex flex-col gap-4 px-2">
          <h1 className="font-bold">POPULAR GAME</h1>
          <div className="mb-8 grid grid-rows-3 justify-items-center gap-8">
            {filterPopular.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        </div>
      </div>

      {/* <div className="flex h-full w-full flex-row flex-wrap justify-center gap-4">
        {popular.slice(0, 10).map((game) => (
          <SmallGameCard src={game.thumbnail} key={game.id} />
        ))}
      </div> */}
      <div className="relative w-full"></div>
    </>
  );
}
