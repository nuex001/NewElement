import React from "react";
import ProfileComponent from "../components/Profile/ProfileComponent";
import { getCookie } from "cookies-next";
import connectDB from "../lib/connectDB";
import Users from "../model/users";
import { useAuthedProfile } from "../context/UserContext";
import { ContractAbi, ContractAddress } from "../components/utils/constants";
import { ethers } from "ethers";
import { fetchListings } from "../components/utils/utils";
import useSWR from "swr";
import { set } from "mongoose";

const fetchAllNfts = async (userAddress: any) => {
  if (typeof window !== "undefined") {
    const provider = new ethers.providers.Web3Provider(
      (window as CustomWindow).ethereum as any
    );
    await (window as CustomWindow)?.ethereum?.request({
      method: "eth_requestAccounts",
    });
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);

    try {
      const listingTx = await contract.fetchListingItem();
      const listings = await fetchListings({ contract, listingTx });

      return listings;
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      return null;
    }
  }
};
const nftFetch = async (userAddress: any) => {
  if (typeof window !== "undefined") {
    const provider = new ethers.providers.Web3Provider(
      (window as CustomWindow).ethereum as any
    );
    await (window as CustomWindow)?.ethereum?.request({
      method: "eth_requestAccounts",
    });
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);

    try {
      const listingTx = await contract.filterNftByAddress(userAddress);
      const res = await fetchListings({ contract, listingTx });

      const listings = await fetchAllNfts(userAddress);

      const collectedNfts = [] as any;
      const listedNfts = [] as any;
      const soldNfts = [] as any;
      const offers = [] as any;

      if (Array.isArray(res)) {
        res.forEach((nft) => {
          if (nft.seller === nft.owner) {
            collectedNfts.push(nft);
          } else {
            listedNfts.push(nft);
          }

          if (nft.sold) {
            soldNfts.push(nft);
          }
        });

        await Promise.all(
          collectedNfts.map(async (nft: any) => {
            const offersTx = await contract.getAllOffersForNFT(nft.id);
            const bidder = offersTx.map((offer: any) => offer.bidder);
            const amount = offersTx.map(
              (offer: any) => Number(offer.amount) / 1e18
            );

            const offersArray = bidder.map((bidder: any, index: any) => ({
              nftId: nft.id,
              bidder,
              amount: amount[index],
            }));

            const combinedObjectsArray = [];

            const groupedObjects = offersArray.reduce(
              (grouped: any, offer: any) => {
                const { nftId, bidder, amount } = offer;
                if (!grouped[nftId]) {
                  grouped[nftId] = [];
                }
                grouped[nftId].push({ bidder, amount });
                return grouped;
              },
              {}
            );

            for (const nftId in groupedObjects) {
              combinedObjectsArray.push({
                nftId: parseInt(nftId),
                bids: groupedObjects[nftId],
              });
            }

            offers.push(combinedObjectsArray);
          })
        );

        return {
          collectedNfts,
          listedNfts,
          soldNfts,
          offers,
          listings,
        };
      } else {
        throw new Error("Failed to fetch NFT data");
      }
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      return null;
    }
  }
};

type Props = {
  user: any;
  users: any;
  collectedNfts: any[];
  listedNfts: any[];
  soldNfts: any[];
  offers: any;
  listings: any;
};

const Profile = ({ user, users }: Props) => {
  const { setAuthedProfile, authedProfile } = useAuthedProfile();

  const { data, error, isLoading } = useSWR("fetcher", () =>
    nftFetch(user.address)
  );

  return (
    <ProfileComponent
      user={user}
      data={data}
      collectedNfts={data?.collectedNfts}
      listedNfts={data?.listedNfts}
      soldNfts={data?.soldNfts}
      offers={data?.offers}
      users={users}
      listings={data?.listings}
      isLoading={isLoading}
    />
  );
};
const getUserData = async ({ req, res }: any) => {
  let auth = getCookie("auth", { req, res });
  await connectDB();

  if (!auth) {
    return {
      notFound: true,
    };
  }

  const json = await Users.findOne({ address: auth });
  const user = JSON.parse(JSON.stringify(json));
  const jsonUsers = await Users.find({});
  const users = JSON.parse(JSON.stringify(jsonUsers));

  return { user, users };
};

export const getServerSideProps = async ({ req, res }: any) => {
  const { user, users } = await getUserData({ req, res });
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
      users,
    },
  };
};

export default Profile;
