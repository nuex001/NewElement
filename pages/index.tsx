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
      <div className={styles.container}>
        {/* Top Section */}
        <h1 className={styles.h1}>NFT Marketplace</h1>

        <hr className={styles.divider} />

        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Link
            href="/create"
            className={styles.mainButton}
            style={{ textDecoration: "none" }}
          >
            Create A Listing
          </Link>
        </div>

        <div className="main">
          {
            // If the listings are loading, show a loading message
            loadingListings ? (
              <div>Loading listings...</div>
            ) : (
              // Otherwise, show the listings
              <div className={styles.listingGrid}>
                {listings?.map((listing) => (
                  <div
                    key={listing.id}
                    className="w-fit rounded-3xl pb-3 border border-gray-500 cursor-pointer"
                    onClick={() => router.push(`/listing/${listing.id}`)}
                  >
                    <MediaRenderer
                      src={listing.asset.image}
                      style={{
                        borderRadius: 16,
                        // Fit the image to the container
                        width: "200px",
                        height: "200px",
                      }}
                    />
                    <h2 className={styles.nameContainer}>
                      <Link
                        href={`/listing/${listing.id}`}
                        className={styles.name}
                      >
                        {listing.asset.name}
                      </Link>
                    </h2>

                    <p>
                      <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                      {listing.buyoutCurrencyValuePerToken.symbol}
                    </p>
                  </div>
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
