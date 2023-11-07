import { createContext } from "react";
import { CanvasContextType } from "../types";

export const CanvasContext = createContext<CanvasContextType | null>(null);
