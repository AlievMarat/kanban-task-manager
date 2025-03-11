import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store/Store"; // путь к файлу с RootState

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
