import React from "react";
import ProfileComponent from "../components/Profile/ProfileComponent";
import { getCookie } from "cookies-next";
import connectDB from "../lib/connectDB";
import Users from "../model/users";
import useAuthedProfile from "../context/UserContext";
import { ContractAbi, ContractAddress } from "../components/utils/constants";
import { ethers } from "ethers";
import { fetchListings } from "../components/utils/utils";

type Props = {
  user: any;
  users: any;
  collectedNfts: any[];
  listedNfts: any[];
  soldNfts: any[];
  offers: any;
  listings: any;
};

const Profile = ({
  user,
  users,
  collectedNfts,
  listedNfts,
  soldNfts,
  offers,
  listings,
}: Props) => {
  // const { setAuthedProfile, authedProfile } = useAuthedProfile();
  // React.useEffect(() => {
  //   setAuthedProfile(user);
  // }, []);

  return (
    <ProfileComponent
      authedProfile={user}
      collectedNfts={collectedNfts}
      listedNfts={listedNfts}
      soldNfts={soldNfts}
      offers={offers}
      users={users}
      listings={listings}
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
const nftFetch = async (userAddress: any) => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_APP_INFURA_ID
  );

  const contract = new ethers.Contract(ContractAddress, ContractAbi, provider);

  try {
    const listingTx = await contract.filterNftByAddress(userAddress);
    const res = await fetchListings({ contract, listingTx });

    const collectedNfts = [] as any;
    const listedNfts = [] as any;
    const soldNfts = [] as any;
    const offers = [] as any;
    const listings = [] as any;

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
      listings.push(res);
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

  const result = await nftFetch(user?.address);

  if (!result) {
    return {
      notFound: true,
    };
  }

  const { collectedNfts, listedNfts, soldNfts, offers, listings } = result;

  return {
    props: {
      user,
      users,
      listedNfts: listedNfts || null,
      collectedNfts: collectedNfts || null,
      soldNfts: soldNfts || null,
      offers: offers || null,
      listings,
    },
  };
};

export default Profile;
