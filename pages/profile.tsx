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
  const { setAuthedProfile, authedProfile } = useAuthedProfile();
  React.useEffect(() => {
    setAuthedProfile(user);
  }, [user]);

  return (
    <ProfileComponent
      authedProfile={authedProfile}
      collectedNfts={collectedNfts}
      listedNfts={listedNfts}
      soldNfts={soldNfts}
      offers={offers}
      users={users}
      listings={listings}
    />
  );
};
export const getServerSideProps = async ({ req, res }: any) => {
  let auth = getCookie("auth", { req, res });
  await connectDB();

  const json = await Users.findOne({ address: auth });
  let user = JSON.parse(JSON.stringify(json));
  const jsonUsers = await Users.find({});
  let users = JSON.parse(JSON.stringify(jsonUsers));

  let listedNfts: any[] = [];
  let collectedNfts: any[] = [];
  let soldNfts: any[] = [];
  let offers = [] as any;
  let listings = [] as any;
  // NFT Fetch
  const nftFetch = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_APP_INFURA_ID
    );

    const contract = new ethers.Contract(
      ContractAddress,
      ContractAbi,
      provider
    );

    const listingTx = await contract.filterNftByAddress(user?.address);

    const res = await fetchListings({ contract, listingTx });

    const listingsTx = await contract.fetchListingItem();

    listings = await fetchListings({ contract, listingTx });

    if (res) {
      res.forEach((nft: any, index: number) => {
        if (nft.seller === nft.owner) {
          collectedNfts.push(nft);
        } else {
          listedNfts.push(nft);
        }
      });
      res.forEach((nft: any, index: number) => {
        if (nft.sold) {
          soldNfts.push(nft);
        }
      });
    }

    await Promise.all(
      collectedNfts.map(async (nft: any, index: number) => {
        const offersTx = await contract.getAllOffersForNFT(nft.id);
        const bidder = offersTx.map((offer: any) => {
          return offer.bidder;
        });
        const amount = offersTx.map((offer: any) => {
          return Number(offer.amount) / 1e18;
        });
        // Function to merge the two arrays into an array of objects with bidder and amount properties
        function mergeArraysIntoObjects(arr1: any, arr2: any) {
          const mergedArray = arr1.map((bidder: any, index: any) => ({
            nftId: nft.id,
            bidder,
            amount: arr2[index],
          }));
          return mergedArray;
        }

        // Call the function to get the merged array of objects
        const offersArray = mergeArraysIntoObjects(bidder, amount);

        // Function to transform an array of objects into an array of combinedObjects
        function combineObjectsArray(objectsArray: any) {
          const combinedObjectsArray = [] as any;

          const groupedObjects = {} as any;

          objectsArray.forEach((obj: any) => {
            const nftId = obj.nftId;
            if (!groupedObjects[nftId]) {
              groupedObjects[nftId] = [];
            }
            groupedObjects[nftId].push({
              bidder: obj.bidder,
              amount: obj.amount,
            });
          });

          for (const nftId in groupedObjects) {
            combinedObjectsArray.push({
              nftId: parseInt(nftId),
              bids: groupedObjects[nftId],
            });
          }

          return combinedObjectsArray;
        }

        // Call the function to get the array of combinedObjects
        const combinedObjectsArray = combineObjectsArray(offersArray);
        offers.push(combinedObjectsArray);
      })
    );
  };

  await nftFetch();

  if (!auth) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        user,
        users,
        listedNfts: listedNfts || null,
        collectedNfts: collectedNfts || null,
        soldNfts: soldNfts || null,
        offers: offers || null,
        listings: listings || null,
      },
    };
  }
};

export default Profile;
