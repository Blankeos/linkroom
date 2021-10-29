import React, { useState } from "react";

import { useEditModalContext } from "../../contexts/EditModalContext";
import { useDeleteModalContext } from "../../contexts/DeleteModalContext";

// Icons
import { GoKebabVertical as MenuIcon } from "react-icons/go";
import { MdEdit as EditIcon } from "react-icons/md";
import { MdDelete as DeleteIcon } from "react-icons/md";
import iconDict from "../../data/iconDict";

// Components
import DropDown from "../DropDown";

//  DND-Kit
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ card, id }) => {
  const { showEditModal } = useEditModalContext();
  const { showDeleteModal } = useDeleteModalContext();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    transition: {
      duration: 150, // milliseconds
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  // Handlers
  const handleEdit = () => {
    // Open edit modal
    showEditModal(card);
  };

  const handleDelete = () => {
    // Open deleteModal
    showDeleteModal(card);
  };

  const dropDownItems = [
    {
      name: "Edit",
      icon: <EditIcon />,
      onClick: handleEdit,
    },
    {
      name: "Delete",
      icon: <DeleteIcon />,
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <div
          className={`h-full transform transition duration-300 ease-in-out cursor-grab ${
            isDragging && "opacity-40"
          }`}
          style={{
            transform: isDragging ? "scale(1.02)" : undefined,
            minHeight: "18rem",
          }}
        >
          <CardElement card={card} dropDownItems={dropDownItems} />
        </div>
      </div>
    </>
  );
};

export default Card;

export const CardElement = ({ card, dropDownItems = [], disabled = false }) => {
  const { title, subheading1, subheading2, links } = card || {}; // in case 'card' is undefined, just destructure an empty object
  return (
    <div className="h-full rounded-2xl shadow hover:shadow-lg transition w-full sm:w-96 inline-block bg-white">
      <div className="h-full rounded-b-2xl rounded-t-3xl">
        <div
          className=" relative flex flex-col space-y-1 text-white p-6 rounded-t-2xl"
          style={{ backgroundColor: (card && card.color) || "#3B82F6" }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "url('/assets/socket_illustration_1.svg')",
              backgroundPosition: "right",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              filter: "grayscale(1)",
            }}
          ></div>
          <div className="relative">
            <div className="flex items-center justify-between text-white pb-2">
              <h2 className="font-bold text-3xl truncate tracking-tight pr-0.5">
                {title}
                {renderDummyIfEmpty(title.length <= 0)}
              </h2>
              <DropDown disabled={disabled} items={dropDownItems}>
                <MenuIcon size="1.5rem" />
              </DropDown>
            </div>
            <p className="text-sm font-light">
              {subheading1}
              {renderDummyIfEmpty(subheading1.length <= 0)}
            </p>
            <p className="text-sm font-light">
              {subheading2}
              {renderDummyIfEmpty(subheading2.length <= 0)}
            </p>
          </div>
        </div>
        <div className="p-6 flex flex-col space-y-2 text-gray-600 rounded-b-2xl">
          {links &&
            links.map((link, i) => {
              return (
                <Link
                  key={i}
                  icon={link && link.icon}
                  url={link && link.url}
                  disabled={disabled}
                >
                  {link.linkName}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const Link = ({ url, icon, children, disabled = false }) => {
  return (
    <a
      href={url || "/404"}
      target={!url ? "" : "_blank"}
      className={`flex items-center space-x-2 hover:text-blue-500 font-light ${
        disabled && "pointer-events-none"
      }`}
    >
      {iconDict[icon]}
      <span>{children}</span>
    </a>
  );
};

// Helper Functions
const renderDummyIfEmpty = (isEmpty) => {
  return (
    <>{isEmpty && <span className="text-transparent select-none">`</span>}</>
  );
};
