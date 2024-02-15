import { createContext } from "react";
import { ModalRef } from "./config";

export const ModalContext = createContext<ModalRef>({
    open: () => {},
    close: () => {},
    isOpen: false,
});