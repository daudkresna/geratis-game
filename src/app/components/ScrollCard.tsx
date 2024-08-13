import React from "react";

const ScrollCard = () => {
  return (
    <div>
      <div className="grid grid-cols-3 grid-rows-3 justify-items-center gap-8">
        {filterPopular.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
};

export default ScrollCard;
