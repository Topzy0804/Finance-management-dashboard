import { createContext, useState, useEffect } from "react";
// import { account } from "../appwrite";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      const currentUser = await account.get();
      setUser(currentUser);
    };

    getLoggedInUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
