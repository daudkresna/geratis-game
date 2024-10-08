import Image from "next/image";
import React from "react";

const LongGameCard = ({
  thumbnail,
  title,
  short_description,
  id,
  platform,
}: {
  thumbnail: string;
  title: string;
  short_description: string;
  id: number;
  platform: string;
}) => {
  return (
    <div className="group flex items-center justify-center gap-4 bg-secondary p-2 shadow duration-300 ease-in-out hover:-translate-y-2 md:w-full">
      <div className="relative min-h-12 min-w-24 overflow-hidden md:h-24 md:w-36 md:min-w-fit">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="flex max-w-[200px] flex-col md:max-w-[300px]">
        <h1>{title}</h1>
        <h3 className="truncate">{short_description}</h3>
      </div>
      <div className="min-h-12 min-w-12">
        {platform.includes("Windows") ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3.00098 5.47902L10.3778 4.4625V11.5902H3.00098V5.47902ZM3.00098 18.521L10.3778 19.5375V12.4982H3.00098V18.521ZM11.1894 19.646L21.001 21V12.4982H11.1894V19.646ZM11.1894 4.35402V11.5902H21.001V3L11.1894 4.35402Z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z"></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default LongGameCard;
