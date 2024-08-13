import Link from "next/link";
import React from "react";

const GameCard = ({
  thumbnail,
  title,
  short_description,
  id,
}: {
  thumbnail: string;
  title: string;
  short_description: string;
  id: number;
}) => {
  return (
    <div className="group card w-80 bg-base-100 shadow-xl">
      <figure>
        <img
          src={thumbnail}
          alt={title}
          className="duration-300 ease-in-out group-hover:scale-110"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title truncate">{title}</h2>
        <p className="truncate">{short_description}</p>
        <div className="card-actions justify-end">
          <Link href={`/game/${id.toString()}`}>
            <button className="btn btn-primary">Check</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
