"use client";
import React, { useEffect, useState } from "react";
import { GameData } from "../../../../type";
import GameCard from "./GameCard";

const SearchBar = ({ games }: { games: GameData[] }) => {
  const [term, setTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GameData[]>(games);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

  //Dijalankan ketika user menekan tombol enter
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    term: string,
  ): void => {
    e.preventDefault();
    const newResults = games.filter((game) => game.title.includes(term));
    setSearchResults(newResults.slice(0, 5));
    setShowSuggestion(true);
    e.currentTarget.reset();
  };

  //Dijalankan ketika user berhenti mengetik
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const newResults = games.filter((game) => game.title.includes(term));
      if (newResults.length != 0 && term != "") {
        setSearchResults(newResults.slice(0, 5));
        setShowSuggestion(true);
      }
    }, 2000);

    return () => {
      clearTimeout(timeOutId);
      setShowSuggestion(false);
    };
  }, [term]);

  return (
    <form
      className="form-control w-full justify-start"
      onSubmit={(e) => handleSubmit(e, term)}
    >
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered relative w-44"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTerm(e.target.value);
        }}
        value={term}
      />
      <div className="mx-auto grid grid-cols-3 gap-4 p-4">
        {term != "" && showSuggestion
          ? searchResults.map((game) => <GameCard key={game.id} {...game} />)
          : null}
      </div>
    </form>
  );
};

export default SearchBar;
