"use client";
import Image from "next/image";
import React from "react";

const Modal = ({ id, src, alt }: { id: string; src: string; alt: string }) => {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <div
        className="relative h-[200px] w-[300px] cursor-pointer"
        onClick={() => {
          if (document) {
            (
              document.getElementById(`my_modal_${id}`) as HTMLFormElement
            ).showModal();
          }
        }}
      >
        <Image src={src} alt={alt} fill />
      </div>
      <dialog id={`my_modal_${id}`} className="modal">
        <div className="modal-box relative h-1/2 w-3/4 md:h-[300px] md:w-[500px]">
          <Image src={src} alt={alt} fill />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
