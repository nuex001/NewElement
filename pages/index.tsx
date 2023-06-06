import type { NextPage } from "next";
import Link from "next/link";
import {
  MediaRenderer,
  useActiveListings,
  useContract,
  useAddress,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { marketplaceContractAddress } from "../addresses";
import { motion, AnimatePresence } from "framer-motion";

import NFTCard from "../components/NFTCard";
import NFTCardSkeleton from "../components/LoadingSkeletons/NFTCardSkeleton";

const Home: NextPage = () => {
  const [filter, setFilter] = useState("all");

  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    "marketplace"
  );
  const address = useAddress();
  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

  const changeFilter = (filter: string) => {
    setFilter(filter);
  };

  return (
    <>
      {/* Content */}
      <div className="flex w-screen overflow-hidden mt-24 max-w-[1600px] flex-col items-center content-center">
        <AnimatePresence>
          <div className="mb-5 w-full px-1 lg:px-0">
            {
              // If the listings are loading, show a loading skeleton
              loadingListings ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:mx-10 mb-10">
                  <NFTCardSkeleton />

                  <NFTCardSkeleton />

                  <NFTCardSkeleton />
                </div>
              ) : (
                // Otherwise, show the listings
                <>
                  <div className="flex font-ibmPlex text-xs mx-4 lg:mx-8 mb-5">
                    <button
                      onClick={() => changeFilter("all")}
                      className={`${
                        filter == "all" ? "border-b-white" : ""
                      }  mr-10 hover:border-b-white focus:border-b-white border-b border-b-transparent transition-all duration-200`}
                    >
                      ALL
                    </button>
                    <button
                      onClick={() => changeFilter("auctions")}
                      className={`${
                        filter === "auctions" ? "border-b-white" : ""
                      } mr-10 hover:border-b-white focus:border-b-white border-b border-b-transparent transition-all duration-200`}
                    >
                      AUCTIONS{" "}
                    </button>
                    <button
                      onClick={() => changeFilter("drops")}
                      className={`${
                        filter === "drops" ? "border-b-white" : ""
                      } hover:border-b-white focus:border-b-white border-b border-b-transparent transition-all duration-200`}
                    >
                      DROPS
                    </button>
                  </div>
                  <div className="grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 gap-10 md:mx-4 lg:mx-8 mb-10">
                    {listings?.map((listing, index) => (
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
                          <NFTCard key={index} listing={listing} />
                        </>
                      </motion.div>
                    ))}
                  </div>
                </>
              )
            }
          </div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default Home;
