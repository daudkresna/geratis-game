import Image from "next/image";
import React from "react";

const BubbleChat = ({
  name,
  comment,
  commentDate,
  image,
}: {
  name: string;
  comment: string;
  commentDate: string;
  image: string;
}) => {
  return (
    <div className="chat chat-start">
      <div className="avatar chat-image">
        <div className="relative w-10 rounded-full">
          <Image alt="Tailwind CSS chat bubble component" src={image} fill />
        </div>
      </div>
      <div className="chat-header">
        {name}
        <time className="ml-2 text-xs opacity-50">{commentDate}</time>
      </div>
      <div className="chat-bubble">{comment}</div>
    </div>
  );
};

export default BubbleChat;
