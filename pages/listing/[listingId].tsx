import {
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useContract,
  useActiveListings,
} from "@thirdweb-dev/react";
import {
  ChainId,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
} from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { marketplaceContractAddress } from "../../addresses";
import styles from "../../styles/Home.module.css";
import profile from "../../assets/PROFILE.png";
import Image from "next/image";
import Link from "next/link";
import PlaceBidModal from "../../components/PlaceBidModal";

const ListingPage: NextPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Next JS Router hook to redirect to other pages and to grab the query from the URL (listingId)
  const router = useRouter();

  // De-construct listingId out of the router.query.
  // This means that if the user visits /listing/0 then the listingId will be 0.
  // If the user visits /listing/1 then the listingId will be 1.
  const { listingId } = router.query as { listingId: string };

  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // Initialize the marketplace contract
  const { contract: marketplace } = useContract(
    marketplaceContractAddress,
    "marketplace"
  );

  // Fetch the listing from the marketplace contract
  const { data: listing, isLoading: loadingListing } = useListing(
    marketplace,
    listingId
  );

  // Store the bid amount the user entered into the bidding textbox
  const [bidAmount, setBidAmount] = useState<string>("");

  if (loadingListing) {
    return <div className={styles.loadingOrError}>Loading...</div>;
  }

  if (!listing) {
    return <div className={styles.loadingOrError}>Listing not found</div>;
  }

  async function createBidOrOffer() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Mumbai);
        return;
      }

      // If the listing type is a direct listing, then we can create an offer.
      if (listing?.type === ListingType.Direct) {
        await marketplace?.direct.makeOffer(
          listingId, // The listingId of the listing we want to make an offer for
          1, // Quantity = 1
          NATIVE_TOKENS[ChainId.Mumbai].wrapped.address, // Wrapped Ether address on Mumbai
          bidAmount // The offer amount the user entered
        );
      }

      // If the listing type is an auction listing, then we can create a bid.
      if (listing?.type === ListingType.Auction) {
        await marketplace?.auction.makeBid(listingId, bidAmount);
      }

      alert(
        `${
          listing?.type === ListingType.Auction ? "Bid" : "Offer"
        } created successfully!`
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // async function buyNft() {
  //   try {
  //     // Ensure user is on the correct network
  //     if (networkMismatch) {
  //       switchNetwork && switchNetwork(ChainId.Mumbai);
  //       return;
  //     }

  //     // Simple one-liner for buying the NFT
  //     await marketplace?.buyoutListing(listingId, 1);
  //     alert("NFT bought successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     alert(error);
  //   }
  // }

  // Modal
  const isModalOpen = () => {
    setModalOpen(true);
  };
  const isModalClosed = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col realtive h-full items-center w-[98dvw]  mt-[6.5rem]  overflow-x-hidden justify-between">
        <div className="flex justify-center realtive w-3/4">
          <div className="absolute right-1/2 left-0 hidden md:block">
            <Link
              href="/"
              className="font-ibmPlex cursor-pointer uppercase font-bold text-green text-xs"
            >
              {"<<<"} Back
            </Link>
          </div>
          <div className="flex flex-col h-full items-center justify-center">
            <div className="w-max min-w-[350px] max-w-[50vw]">
              <Image
                src={listing?.asset.image as string}
                alt={listing?.asset.name as string}
                width={400}
                height={600}
                className="w-full mb-2 object-contain"
              />{" "}
              <div className="flex flex-col font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
                <div className=" flex ">
                  <div className="">
                    <p>{listing?.asset.description}</p>
                  </div>
                  <div className="flex grow"></div>
                  <div className=" flex text-left">
                    {" "}
                    <p className="pr-6 ">
                      Reserve <br /> Price
                    </p>
                    <p className="font-bold ">
                      1.1 <br /> ETH
                    </p>
                  </div>
                </div>

                <div className=" flex mt-3">
                  <div className="font-bold flex">
                    <b>
                      {listing.sellerAddress?.slice(0, 6) +
                        "..." +
                        listing.sellerAddress?.slice(36, 40)}
                    </b>
                  </div>

                  <div className="flex grow"></div>
                  <div className=" flex text-left">
                    {" "}
                    <p className="pr-6 ">
                      Current <br /> Bid
                    </p>
                    <p className="font-bold text-green">
                      2.5 <br /> ETH
                    </p>
                  </div>
                </div>
                <div className=" flex mt-3">
                  <div className="flex grow"></div>
                  <div className=" flex font-bold text-green">
                    {" "}
                    <p className="pr-5">ENDS IN</p> <p> 10H 22M 09S</p>
                  </div>
                  <div className="flex grow"></div>
                </div>
              </div>
            </div>
            <div className="font-ibmPlex w-[30vw] min-w-[400px] flex items-center justify-between">
              <button
                className=" text-green font-xCompressed  w-full border border-green uppercase tracking-[8px] py-1 bg-white bg-opacity-20 hover:bg-opacity-30 font-semibold text-xl  "
                onClick={isModalOpen}
              >
                PLACE BID
              </button>
            </div>
            <div className="font-ibmPlex bold text-center w-[70%] max-w-4xl mt-10 pb-10 border-b leading-5 text-xs">
              <p>
                I painted The Red Man at what I like to think was perhaps the
                end of an artistic era, and the beginning of a new one--one that
                I had no idea was even emerging. For years, I had held my idols
                close to my heart, painting step by step after them. The Red Man
                was the first time I let go, and held on to myself instead. This
                was a painting of grace. One that it felt the universe helped me
                make. I had just turned 20, my life a blur (I had no money), but
                the day I posted this on Twitter, the painting garnering
                millions of views and my life changed forever. People ask me a
                lot, &apos;What inspired the painting?&apos; and I smile and
                respond, &apos;Life.&apos; This was a distillation of everything
                I had known and learnt in these years. All my pain, my tears, my
                laughs and my joys. It&apos;s a painting I&apos;m very proud of.
              </p>
            </div>
            <div className="flex w-[70%] max-w-4xl mt-6 font-ibmPlex text-xs">
              <div className="flex flex-1/2 flex-col w-1/2 items-start">
                <button className="text-green mb-4">
                  SHARE AND EARN 1% {">>"}
                </button>
                <button className="mb-4">VIEW ON ETHERSCAN {">"}</button>
                <button className="mb-4">VIEW METADATA {">"}</button>
                <button className="mb-4">VIEW ON IPFS {">"}</button>
              </div>
              <div className="flex-1/2  w-1/2">
                <p className="text-left mb-2">HISTORY</p>
                <div className="flex  justify-between">
                  <Image
                    src={profile}
                    width={30}
                    height={20}
                    alt="profile picture"
                  />
                  <p className="pl-4">
                    Bid placed by <span className="font-bold"> @Josh90</span>{" "}
                    <br /> Jan 15, 2023 at 7.31pm
                  </p>
                  <div className="flex flex-grow"></div>
                  <p className="font-bold text-green">
                    2.5 <br /> ETH
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlaceBidModal
        bidAmount={bidAmount}
        setBidAmount={setBidAmount}
        listing={listing}
        isModalClosed={isModalClosed}
        modalOpen={modalOpen}
      />
    </>
  );
};

export default ListingPage;
