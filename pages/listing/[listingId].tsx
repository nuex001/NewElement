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
import ListingComponent from "../../components/Listing/ListingComponent";

const ListingPage: NextPage = () => {
  return <ListingComponent />;
};

export default ListingPage;
