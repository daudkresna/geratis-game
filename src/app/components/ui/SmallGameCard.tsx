import Image from "next/image";
import React from "react";

const SmallGameCard = ({ src }: { src: string }) => {
  return (
    <div className="w-58 lg:w-68 relative h-40 hover:w-10 lg:h-48">
      <Image
        alt="Game Thumbnail"
        src={src}
        fill
        className="rounded-md object-fill"
      />
    </div>
  );
};

export default SmallGameCard;
