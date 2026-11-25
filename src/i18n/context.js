import { createContext, useContext } from "react";
import { english } from "./locale.js";

export const LocaleContext = createContext(english);
export const useLocale = () => useContext(LocaleContext);
