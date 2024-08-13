"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const PaginationButton = ({ page }: { page: number }) => {
  const searchParams = useSearchParams();

  const { replace } = useRouter();
  const pathname = usePathname();
  const handleNext = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", (page + 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePrev = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", (page - 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="join mb-8">
      <button className={`btn join-item`} onClick={handlePrev}>
        «
      </button>
      <button className={`btn join-item`}>{page.toString()}</button>
      <button className={`btn join-item`} onClick={handleNext}>
        »
      </button>
    </div>
  );
};

export default PaginationButton;
