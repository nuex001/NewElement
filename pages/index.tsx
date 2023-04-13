import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
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
      <div className="flex w-full mt-24 flex-col items-center content-center">
        {/* Top Section */}
        {/* <h1 className="font-ibmPlex">NFT Marketplace</h1>

        <hr className={styles.divider} />

        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Link
            href="/create"
            className={styles.mainButton}
            style={{ textDecoration: "none" }}
          >
            Create A Listing
          </Link>
        </div> */}

        <div className="mb-5 ">
          {
            // If the listings are loading, show a loading message
            loadingListings ? (
              // <div >Loading listings...</div>
              <div className="flex justify-center items-center w-[100dvw] mt-32">
                <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-black via-blue-500 to-green ">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black rounded-full "></div>
                </div>
              </div>
            ) : (
              // Otherwise, show the listings
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-10 mb-10">
                {listings?.map((listing) => (
                  <>
                    <NFTCard listing={listing} />
                  </>
                ))}
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;
