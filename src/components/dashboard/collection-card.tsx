import * as HoverCard from "@radix-ui/react-hover-card";
import { CollectionCardType } from "../../types";

export const CollectionCard = ({ id, name }: CollectionCardType) => {
  return (
    <div>
      <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
        <HoverCard.Root>
          <HoverCard.Trigger className="flex gap-1 absolute top-3 right-3">
            <div className="bg-primary-600 h-2 w-2 rounded-full"></div>
            <div className="bg-primary-600 h-2 w-2 rounded-full"></div>
            <div className="bg-primary-600 h-2 w-2 rounded-full"></div>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content sideOffset={10} className="w-20 -mr-3">
              <div className="w-full">
                <button className="w-full bg-white text-sm py-1 relative right-3">
                  Delete
                </button>
              </div>
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </div>
      <span className="block text-center py-2">{name}</span>
    </div>
  );
};