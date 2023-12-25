import { useContext } from "react";
import { CanvasContext } from "../../context/canvasContext";
import { CanvasContextType } from "../../types";
import { IconTrash } from "@tabler/icons-react";

export const DeleteObjectButton = () => {
    const { deleteObject } = useContext(
        CanvasContext as React.Context<CanvasContextType>
      );
    return (
        <IconTrash size={18} onClick={deleteObject} className="hover:cursor-pointer" />
    )
}