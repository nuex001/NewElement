import type { NextPage } from "next";
import Link from "next/link";
import {
  MediaRenderer,
  useActiveListings,
  useContract,
  useAddress,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import { useRouter } from "next/router";
import { marketplaceContractAddress } from "../addresses";
import NFTCard from "../components/NFTCard";
import NFTCardSkeleton from "../components/LoadingSkeletons/NFTCardSkeleton";

const Home: NextPage = () => {
  const router = useRouter();
  const [collection, setCollection] = useState({});
  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    "marketplace"
  );
  const address = useAddress();
  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

  useEffect(() => {
    if (!address) return;
    (async () => {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: address,
        walletAddress: address,
      };

      const result = await client.createIfNotExists(userDoc);
    })();
  }, [address]);

  //gzLJ4ph6nLxUjfN95Q4b8bzRIynSGnKy
  //https://polygon-mumbai.g.alchemy.com/v2/gzLJ4ph6nLxUjfN95Q4b8bzRIynSGnKy

  // const fetchCollectionData = async (sanityClient = client) => {
  //   const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
  //   "imageUrl": profileImage.asset->url,
  //   "bannerImageUrl": bannerImage.asset->url,
  //   volumeTraded,
  //   createdBy,
  //   contractAddress,
  //   "creator": createdBy->userName,
  //   title, floorPrice,
  //   "allOwners": owners[]->,
  //   description
  // }`;

  //   const collectionData = await sanityClient.fetch(query);

  //   console.log(collectionData, "🔥");

  //   // the query returns 1 object inside of an array
  //   await setCollection(collectionData[0]);
  // };

  return (
    <>
      {/* Content */}
      <div className="flex w-screen overflow-hidden mt-24 max-w-[1584px] flex-col items-center content-center">
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
                <div className="flex font-ibmPlex text-sm mx-4 lg:mx-8 mb-5">
                  <button className="mr-10 hover:border-b-white focus:border-b-white border-b border-b-transparent transition-all duration-200">
                    ALL
                  </button>
                  <button className="mr-10 hover:border-b-white focus:border-b-white border-b border-b-transparent transition-all duration-200">
                    AUCTIONS{" "}
                  </button>
                  <button className=" hover:border-b-white focus:border-b-white border-b border-b-transparent transition-all duration-200">
                    DROPS
                  </button>
                </div>
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10 lg:mx-8 mb-10">
                  {listings?.map((listing) => (
                    <>
                      <NFTCard listing={listing} />
                    </>
                  ))}
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;
