import React, { FunctionComponent } from "react";
import Router from "next/router";
import Image from "next/image";
import avatar from "../../assets/avatar.gif";
import ribbon from "../../assets/ribbon.png";
import send from "../../assets/send.png";

type Props = {
  listing: any;
  users: any;
  key: any;
};
const CollectionCard: FunctionComponent<Props> = ({ listing, users }: any) => {
  const owner = users.find((user: any) => user.address === listing.creator);
  const artistNameOrAddress = owner
    ? owner?.username
    : listing?.seller
        ?.slice(0, 3)
        .concat("...")
        .concat(listing.seller.slice(-4));

  const artistProfilePic = owner?.profilePicture
    ? owner.profilePicture
    : avatar;
  return (
    <>
      {listing ? (
        <div className="flex flex-col h-full px-4 md:px-0 overflow-hidden justify-between">
          <div className="flex flex-col h-full">
            {/* <div className="flex grow"></div> */}
            <div
              onClick={() => {
                Router.push({
                  pathname: `/collection/${listing.id}`,
                });
              }}
              className=" overflow-hidden h-full flex min-h-[370px] max-h-[450px]  xl:max-h-[580px] justify-center items-center mb-3"
            >
              <Image
                src={listing?.image}
                alt={listing?.title}
                width={400}
                height={400}
                className="w-full  object-cover cursor-pointer"
              />
            </div>

            <div className="flex flex-col font-ibmPlex mb-16 uppercase text-xs text-[#e4e8eb] ">
              <div className=" flex ">
                <div className="">{/* <p>{listing?.description}</p> */}</div>
                <div className="flex grow"></div>
                <div className=" flex text-left">
                  {" "}
                  {/* <p className="pr-[1.25rem]">
                  Token <br /> symbol
                  </p>
                  <p className="font-bold text-green">
                  {listing?.Tokensymbol}
                  </p> */}
                </div>
              </div>

              <div className=" flex mt-3">
                <div
                  onClick={() => {
                    Router.push({
                      pathname: `/user/${owner._id}`,
                    });
                  }}
                  className="font-bold flex cursor-pointer"
                >
                  <p>BY @{artistNameOrAddress}</p>
                  <Image
                    className="ml-3 -mt-1 h-6  object-cover rounded-full"
                    src={artistProfilePic}
                    height={10}
                    width={25}
                    alt={""}
                  />
                </div>

                <div className="flex grow"></div>
                <div className=" flex text-left">
                  {" "}
                  <p className="pr-[1.25rem]">
                    Token <br /> symbol
                  </p>
                  <p className="font-bold text-green">{listing?.Tokensymbol}</p>
                </div>
              </div>
              <div className=" flex mt-3">
                <div className="font-bold flex">
                  <Image
                    className=" h-5"
                    src={ribbon}
                    height={10}
                    width={20}
                    alt={""}
                  />
                </div>

                <div className="flex grow"></div>
                <div className=" flex font-bold text-green">
                  {" "}
                  {/* <p className="pr-5">ENDS IN</p> <p> 10H 22M 09S</p> */}
                </div>
                <div className="flex grow"></div>

                <div className="font-bold flex">
                  <Image
                    className="ml-3 h-5"
                    src={send}
                    height={10}
                    width={20}
                    alt={""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default CollectionCard;
