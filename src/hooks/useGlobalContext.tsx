import { useContext } from "react";
import { GlobalContext } from "../contexts/globalContext";

export const useGlobalContext = () => useContext(GlobalContext);
