import { useContext } from "react";
import { CanvasContext } from "../../../context/canvasContext";
import { CanvasContextType } from "../../../types";
import { MobileFooter } from "./mobile-footer";
import { MobileEditFooter } from "./mobile-edit-footer";

export const MobileToolbar = () => {
    const { fabricRef } = useContext(
        CanvasContext as React.Context<CanvasContextType>
      );

  if (fabricRef.current?._activeObject) {
    return <MobileEditFooter />
  }

  return <MobileFooter />
};
