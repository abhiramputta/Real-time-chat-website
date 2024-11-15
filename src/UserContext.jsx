// UserContext.js
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isContactAdded, setContactAdded] = useState(false);

  return (
    <UserContext.Provider
      value={{ userId, setUserId, isContactAdded, setContactAdded }}
    >
      {children}
    </UserContext.Provider>
  );
};
