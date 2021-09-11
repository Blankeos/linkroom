import React, { forwardRef } from "react";
import { GoKebabVertical as MenuIcon } from "react-icons/go";
import { IoMdClose as DeleteIcon } from "react-icons/io";
import iconDict from "../../data/iconDict";

import { CardElement } from "./Card";

const CardOverlay = forwardRef(({ id, cards, isDropped, ...props }, ref) => {
  const card = cards[cards.findIndex((c) => c._id === id)];

  return (
    <div
      className={`h-full fixed cursor-grabbing ${
        isDropped ? "card-overlay-dropped" : "card-overlay"
      }`}
      style={{ minHeight: "18rem" }}
      {...props}
      ref={ref}
    >
      <CardElement card={card} disabled={true} />
    </div>
  );
});

export default CardOverlay;
