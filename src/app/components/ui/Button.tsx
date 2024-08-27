"use client";
import React from "react";
import FormButton from "./FormButton";

const Button = ({
  userId,
  title,
  gameTitle,
  gameId,
  gameThumbnail,
  collectionAction,
}: {
  userId: string;
  title: string;
  gameTitle: string;
  gameId: string;
  gameThumbnail: string;
  collectionAction: (formData: FormData) => Promise<void>;
}) => {
  return (
    <form action={collectionAction}>
      <input type="text" hidden name="userId" value={userId} readOnly />
      <input type="text" hidden name="gameName" value={gameTitle} readOnly />
      <input type="text" hidden name="gameId" value={gameId} readOnly />
      <input
        type="text"
        hidden
        name="gameThumbnail"
        value={gameThumbnail}
        readOnly
      />
      <FormButton>{title}</FormButton>
    </form>
  );
};

export default Button;
