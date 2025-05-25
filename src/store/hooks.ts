// import { useDispatch, useSelector } from "react-redux";
// import type { TypedUseSelectorHook } from "react-redux";
// import type { RootState, AppDispatch } from "./store";
export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  if (!user) return false;
  try {
    const parsed = JSON.parse(user);
    return parsed.token && parsed.exp * 1000 > Date.now(); // also checks expiry
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
