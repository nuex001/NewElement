import React, { useState, useContext, createContext, ReactNode } from "react";
interface CurrentUserContextType {
  username: string;
}
const AuthedProfileContext = createContext<CurrentUserContextType | any>({});
type Props = {
  children: ReactNode;
};
export const AuthedProfileProvider = ({ children }: Props) => {
  const [authedProfile, setAuthedProfile] = useState(null);
  const value = {
    authedProfile,
    setAuthedProfile,
  };

  return (
    <AuthedProfileContext.Provider value={value}>
      {children}
    </AuthedProfileContext.Provider>
  );
};

export const useAuthedProfile = () => useContext(AuthedProfileContext);
export default useAuthedProfile;
