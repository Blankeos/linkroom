import React, { useState } from "react";
import Card from "./Card";
import { useCardsContext } from "../../contexts/CardsContext";

import EditableCard from "./EditableCard";
import AddCardButton from "./AddCardButton";

// Sortable HOC
import { SortableContainer, SortableElement } from "react-sortable-hoc";

// DND-Kit
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

const renderEditableCards = (cards) => {
  const allCards = cards.map((card, index) => (
    <EditableSortableItem key={card._id} index={index} card={card} i={index} />
  ));

  return [...allCards, <AddCardSortableItem key="add-card" disabled />];
};
// --SORTABLE HOC Setup--
const SortableList = SortableContainer(({ cards, isEditingAllCards }) => {
  return (
    <ul className="grid sm:justify-center gap-5 p-5 pb-16 grid-cols-1 cards-grid">
      {isEditingAllCards
        ? renderEditableCards(cards)
        : cards.map((card, index) => (
            <SortableItem key={card._id} index={index} card={card} />
          ))}
    </ul>
  );
});

const EditableSortableItem = SortableElement(({ card, i }) => (
  <li className="list-none" style={{ minHeight: "18rem" }}>
    <EditableCard
      index={i}
      title={card.title}
      subheading1={card.subheading1}
      subheading2={card.subheading2}
      links={card.links}
    />
  </li>
));

const AddCardSortableItem = SortableElement(({}) => (
  <li className="list-none" style={{ minHeight: "18rem" }}>
    <AddCardButton />
  </li>
));

// const SortableItem = SortableElement(({ card }) => (
//   <li className="list-none" style={{ minHeight: "18rem" }}>
//     <Card
//       cardID={card._id}
//       title={card.title}
//       subheading1={card.subheading1}
//       subheading2={card.subheading2}
//       links={card.links}
//     />
//   </li>
// ));
// --SORTABLE HOC Setup--

// const CardsGrid = ({ cards, isEditingAllCards }) => {
//   const { reorderCard } = useCardsContext();

//   const onSortEnd = ({ oldIndex, newIndex }) => {
//     reorderCard(oldIndex, newIndex);
//   };

//   return (
//     <>
//       <SortableList
//         cards={cards}
//         isEditingAllCards={isEditingAllCards}
//         onSortStart={() => {
//           if (window.getSelection) {
//             window.getSelection().removeAllRanges();
//           } else if (document.selection) {
//             document.selection.empty();
//           }
//         }}
//         onSortEnd={onSortEnd}
//         axis="xy"
//         helperClass="opacity-90"
//         pressDelay={200}
//       />
//     </>
//   );
// };

import { SortableItem } from "./SortableItem";
import { DragOverlay } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { isMobile } from "react-device-detect";
import CardOverlay from "./CardOverlay";

const CardsGrid = ({ cards, isEditingAllCards }) => {
  const { reorderCard } = useCardsContext();
  const [activeId, setActiveId] = useState(null);
  const [isDropped, setIsDropped] = useState(false);

  const mobileSensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const defaultSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        tolerance: 5,
        delay: 150,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
    setIsDropped(false);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = cards.findIndex((card) => card._id === active.id);
      const newIndex = cards.findIndex((card) => card._id === over.id);

      reorderCard(oldIndex, newIndex);

      setActiveId(null);
    }
    setIsDropped(true);
  };

  return (
    <>
      <div className="grid sm:justify-center gap-5 p-5 pb-16 grid-cols-1 cards-grid">
        <DndContext
          sensors={isMobile ? mobileSensors : defaultSensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
          onDragStart={(event) => {
            handleDragStart(event);
            if (window.getSelection) {
              window.getSelection().removeAllRanges();
            } else if (document.selection) {
              document.selection.empty();
            }
          }}
        >
          <SortableContext
            items={cards.map((card) => card._id)}
            strategy={rectSortingStrategy}
          >
            {cards.map((card) => (
              <Card key={card._id} id={card._id} card={card} />
            ))}
          </SortableContext>

          <DragOverlay adjustScale={true}>
            {activeId ? (
              <CardOverlay cards={cards} id={activeId} isDropped={isDropped} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};

export default CardsGrid;
