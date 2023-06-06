import Image from "next/image";
import React, { useEffect, useState } from "react";
import banner from "../../assets/banner.png";
import profile from "../../assets/profile-2.png";
import star from "../../assets/Star-PNG-Images.png";
import { useAuthedProfile } from "../../context/UserContext";
import nft1 from "../../assets/nft-1.jpeg";
import nft2 from "../../assets/nft-2.jpeg";
import nft3 from "../../assets/nft-3.webp";
import nft4 from "../../assets/nft-4.jpeg";
import nft5 from "../../assets/nft-5.jpeg";
import nft6 from "../../assets/nft-6.jpeg";
import nft7 from "../../assets/nft-7.png";
import nft10 from "../../assets/nft-10.png";
import Link from "next/link";
import axios from "axios";

type Props = {};

const PublicProfileComponent = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const { setAuthedProfile, authedProfile } = useAuthedProfile();
  console.log(authedProfile);

  return (
    <div
      className={`flex flex-col w-full max-w-[1590px] px-4 md:px-3 lg:px-6 mt-20 md:mt-24  bg-black overflow-hidden ${
        loading && `cursor-progress`
      }`}
    >
      <div className="flex flex-col w-full font-ibmPlex ">
        <label className="cursor-pointer" htmlFor="input-banner">
          <Image
            src={banner}
            width={1600}
            height={200}
            alt="banner"
            className="h-[12vh] md:h-[14vh]  object-cover   z-0"
          />
        </label>

        <div className="flex w-full -mt-4">
          <label className="cursor-pointer" htmlFor="input-profile">
            <Image
              className="border border-green rounded-full hover:brightness-125 bg-black z-10 object-center object-cover aspect-square"
              src={profile}
              width={70}
              height={70}
              alt="profile"
            />
          </label>
          <Image
            className="ml-4 mb-1 h-5 self-center"
            src={star}
            width={20}
            height={10}
            alt="star"
          />
          <p className="text-xs pl-1 font-bold tracking-wider self-center">
            ARTIST
          </p>
        </div>

        <div className="flex flex-col w-full mt-4 text-left text-xs">
          <h1 className="text-2xl mb-1 font-bold">JOH KANE</h1>
          <p>
            Hi all, I&apos;m Ahad aka wiresandtrees, I&apos;m a freelance artist
            and architect (RIBA Part II) based in the UK. I love visually
            exploring the state between &apos;dreams&apos; and
            &apos;nightmares&apos;.
          </p>
        </div>
        <div className="flex  flex-col-reverse md:flex-col">
          <div className="flex flex-col font-ibmPlex mt-10 text-left">
            <h3 className="font-bold">LISTED</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4  items-stretch gap-10 md:gap-4 mb-10 mt-4">
              {/* NFT 1  */}
              <div className="flex md: flex-col h-full items-start w-max ">
                <div className="">
                  <Image
                    src={nft7}
                    alt="nft7"
                    width={150}
                    height={200}
                    className="max-h-[220px] md:max-h-[300px] w-[41vw] md:w-full md:min-w-[230px] mb-2 object-cover"
                  />{" "}
                </div>
                <div className="flex flex-col w-full md:min-w-[230px] font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
                  <div className=" flex ">
                    <div className=" flex w-full">
                      {" "}
                      <p className="pr-6 ">
                        Reserve NOt
                        <br /> met
                      </p>
                      <div className="flex grow"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* NFT 2  */}

              <div className="flex  flex-col h-full items-start w-max ">
                <div className="">
                  <Image
                    src={nft6}
                    alt="nft7"
                    width={150}
                    height={200}
                    className="max-h-[220px] md:max-h-[300px] w-[41vw] md:w-full md:min-w-[230px] mb-2 object-cover"
                  />{" "}
                </div>
                <div className="flex flex-col w-full md:min-w-[230px] font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
                  <div className=" flex ">
                    <div className=" flex w-full">
                      {" "}
                      <p className="pr-6 ">
                        Reserve <br /> Price
                      </p>
                      <div className="flex grow"></div>
                      <p className="font-bold ">
                        1.1 <br /> ETH
                      </p>
                    </div>
                  </div>

                  <div className=" flex mt-3  ">
                    <div className=" flex w-full">
                      {" "}
                      <p className="pr-6  ">
                        Current <br /> Bid
                      </p>
                      <div className="flex grow"></div>
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

              {/* NFT 3  */}
              <div className="flex  flex-col h-full items-start w-max">
                <div className="">
                  <Image
                    src={nft4}
                    alt="nft7"
                    width={150}
                    height={200}
                    className="max-h-[220px] md:max-h-[300px] w-[41vw] md:w-full md:min-w-[230px] mb-2 object-cover"
                  />{" "}
                </div>
                <div className="flex flex-col w-full md:min-w-[230px] font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
                  <div className=" flex ">
                    <div className=" flex w-full">
                      {" "}
                      <p className="pr-6 ">
                        Reserve <br /> Price
                      </p>
                      <div className="flex grow"></div>
                      <p className="font-bold ">
                        1.1 <br /> ETH
                      </p>
                    </div>
                  </div>

                  <div className=" flex mt-3  ">
                    <div className=" flex w-full">
                      {" "}
                      <p className="pr-6  ">
                        Current <br /> Bid
                      </p>
                      <div className="flex grow"></div>
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

              {/* NFT 4  */}
              <div className="flex  flex-col h-full items-start w-max ">
                <div className="">
                  <Image
                    src={nft10}
                    alt="nft7"
                    width={150}
                    height={200}
                    className="max-h-[220px] md:max-h-[300px] w-[41vw] md:w-full md:min-w-[230px] mb-2 object-cover"
                  />{" "}
                </div>
                <div className="flex flex-col w-full md:min-w-[230px] font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
                  <div className=" flex ">
                    <div className=" flex w-full">
                      {" "}
                      <p className="pr-6 ">
                        Reserve not
                        <br /> met
                      </p>
                      <div className="flex grow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLLECTION */}
            <div className="flex flex-col">
              <h3 className="font-bold">COLLECTION</h3>

              <div className="grid grid-cols-2 lg:grid-cols-4 items-stretch gap-4 mb-10 mt-4">
                {/* nft 1 */}
                <div className="flex  flex-col h-full items-start w-max ">
                  <div className="">
                    <Image
                      src={nft2}
                      alt="nft7"
                      width={150}
                      height={200}
                      className="max-h-[220px] md:max-h-[300px] w-[41vw] md:w-full md:min-w-[230px] mb-2 object-cover"
                    />{" "}
                  </div>
                  <div className="flex flex-col w-full md:min-w-[230px] font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
                    <div className=" flex ">
                      <div className=" flex w-full">
                        {" "}
                        <p className="pr-6 ">
                          Bought <br /> For
                        </p>
                        <div className="flex grow"></div>
                        <p className="font-bold text-green">
                          1.1 <br /> ETH
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfileComponent;
