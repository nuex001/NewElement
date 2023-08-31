import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { ethers } from "ethers";
import { set } from "mongoose";
import { useWalletClient } from "wagmi";
interface CurrentUserContextType {
  username: string;
}
const AuthedProfileContext = createContext<CurrentUserContextType | any>({});
type Props = {
  children: ReactNode;
};
export const AuthedProfileProvider = ({ children }: Props) => {
  const [authedProfile, setAuthedProfile] = useState(null as any);

  const value = {
    authedProfile,
    setAuthedProfile,
  };

  const [address, setAddress] = useState<any>(0);

  const { data: walletClient } = useWalletClient();

  const reg = (userData: any) => {
    axios
      .post("/api/signIn", userData)
      .then((res) => {
        console.log(res);
        setAuthedProfile(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAdrress = async () => {
    const accounts = await walletClient?.getAddresses();

    // Return the first account address]
    if (accounts) {
      const address = accounts[0];
      setAddress(address);
      const userData = {
        address: address,
      };
      reg(userData);
    }
  };
  useEffect(() => {
    if (walletClient) {
      getAdrress();
    }
  }, [walletClient]);
  console.log(address);

  return (
    <AuthedProfileContext.Provider value={value}>
      {children}
    </AuthedProfileContext.Provider>
  );
};

export const useAuthedProfile = () => useContext(AuthedProfileContext);
export default useAuthedProfile;
