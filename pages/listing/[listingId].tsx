import type { NextPage } from "next";
import ListingComponent from "../../components/Listing/ListingComponent";
import { getCookie } from "cookies-next";
import connectDB from "../../lib/connectDB";
import Users from "../../model/users";
import { BigNumber, ethers } from "ethers";
import { ContractAbi, ContractAddress } from "../../components/utils/constants";
import { fetchListing } from "../../components/utils/utils";

const ListingPage: NextPage = ({ users, listing, bids }: any) => {
  return <ListingComponent users={users} listing={listing} bids={bids} />;
};

export const getServerSideProps = async ({ req, res, query }: any) => {
  let auth = getCookie("auth", { req, res });

  await connectDB();
  const jsonUsers = await Users.find({});
  let users = JSON.parse(JSON.stringify(jsonUsers));

  // NFT fetch
  const nftFetch = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_APP_INFURA_ID
    );

    const contract = new ethers.Contract(
      ContractAddress,
      ContractAbi,
      provider
    );

    const id = Number(query.listingId);
    const listingTx = await contract.fetchNFT(id);
    // console.log(listingTx)
    let listing = await fetchListing({ contract, listingTx });

    // Get the latest block number
    const toBlock = await provider.getBlockNumber();
    const fromBlock = 0;
    const tokenId = BigNumber.from(query.listingId);
    let bids: any = [];
    // Subscribe to the 'Bid' event
    await contract
      .queryFilter(contract.filters.Bid(), fromBlock, toBlock)
      .then((events) => {
        events.map((event: any) => {
          // console.log(Number(event.args.listingId), query.listingId);

          if (Number(event.args.listingId) == query.listingId) {
            const { sender, amount } = event?.args;
            const formattedAmount = Number(amount) / 1e18;
            // console.log(sender, formattedAmount);
            bids.push({ sender, amount: formattedAmount });
          }
        });
      });

    return { listing, bids };
  };

  // const getBids = async () => {
  //   const provider = new ethers.providers.JsonRpcProvider(
  //     process.env.NEXT_APP_INFURA_ID
  //   );

  //   const contract = new ethers.Contract(
  //     ContractAddress,
  //     ContractAbi,
  //     provider
  //   );
  //   // Get the latest block number
  //   const toBlock = await provider.getBlockNumber();
  //   const fromBlock = 0;
  //   const tokenId = BigNumber.from(query.listingId);
  //   let bids: any = [];
  //   // Subscribe to the 'Bid' event
  //   await contract
  //     .queryFilter(contract.filters.Bid(), fromBlock, toBlock)
  //     .then((events) => {
  //       events.map((event: any) => {
  //         // console.log(Number(event.args.listingId), query.listingId);

  //         if (Number(event.args.listingId) == query.listingId) {
  //           const { sender, amount } = event?.args;
  //           const formattedAmount = Number(amount) / 1e18;
  //           // console.log(sender, formattedAmount);
  //           bids.push({ sender, amount: formattedAmount });
  //         }
  //       });
  //     });

  //   return bids;
  // };

  let { listing, bids } = await nftFetch();
  // let bids = await getBids();
  console.log(bids);

  if (!auth) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { users, listing, bids: bids || null },
    };
  }
};

export default ListingPage;
