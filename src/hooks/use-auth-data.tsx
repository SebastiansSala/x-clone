import { useContext } from "react";

import { AuthDataContext } from "../contexts/auth-data-provider";

export default function useAuthData() {
  const context = useContext(AuthDataContext);
  if (!context) {
    throw new Error("useAuthData must be used within an AuthDataProvider");
  }

  return context;
}
