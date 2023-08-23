import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CollectionCard from "./CollectionCard";
import { ethers } from "ethers";
import { ContractAbi, ContractAddress } from "../utils/constants";
import { fetchcontractListings } from "../utils/utils";
type Props = {};

const CollectionMarketPage = ({ users }: any) => {
  const [listings, setListings] = useState<any>([]);

  const fetchlisting = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    const contract = new ethers.Contract(
      ContractAddress,
      ContractAbi,
      provider
    );

    const collectionTx = await contract.fetchCollections();
    console.log(collectionTx);
    const res = await fetchcontractListings(collectionTx);
    setListings(res);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchlisting();
    }
  }, []);

  return (
    <AnimatePresence>
      <div className="grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 gap-10 md:mx-4 lg:mx-8 mb-10">
        {listings?.map((listing: any, index: any) => (
          <motion.div
            key={index}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            exit={{
              opacity: 0,
              y: 90,
              transition: {
                ease: "easeInOut",
                delay: 1,
              },
            }}
          >
            <>
              <CollectionCard key={index} listing={listing} users={users} />
            </>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default CollectionMarketPage;
