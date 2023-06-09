import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { set } from "mongoose";
interface CurrentUserContextType {
  username: string;
}
const AuthedProfileContext = createContext<CurrentUserContextType | any>({});
type Props = {
  children: ReactNode;
};
export const AuthedProfileProvider = ({ children }: Props) => {
  const [authedProfile, setAuthedProfile] = useState(null as any);
  const [loading, setLoading] = useState(true as boolean);

  const value = {
    authedProfile,
    setAuthedProfile,
    loading,
  };
  const address = useAddress();

  useEffect(() => {
    if (address) {
      axios.post("/api/signIn", { address }).then((res) => {
        setAuthedProfile(res.data.user);
      });
    } else {
      setLoading(false);
    }
    setLoading(false);
  }, [address]);
  return (
    <AuthedProfileContext.Provider value={value}>
      {children}
    </AuthedProfileContext.Provider>
  );
};

export const useAuthedProfile = () => useContext(AuthedProfileContext);
export default useAuthedProfile;
