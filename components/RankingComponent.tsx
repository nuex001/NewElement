import React from "react";
import profile from "../assets/PROFILE.png";
import plus from "../assets/plus_white.png";
import Image from "next/image";

type Props = {};

const RankingComponent = (props: Props) => {
  return (
    <div className="flex w-screen  mt-36 justify-center bg-black ">
      <div className="grid w-[80vw] text-left base:grid-cols-1  md:grid-cols-3 gap-10 font-xxCompressed text-3xl tracking-wider">
        <div className="">
          <h1>TOP 50 COLLECTORS</h1>
          <div className="grid grid-cols-5 gap-3 mt-3">
            <p className="text-green text-4xl">1</p>
            <div className="col-span-3 flex items-center -ml-6">
              <Image src={profile} height={10} width={30} alt={""} />
              <p className="text-xs font-ibmPlex ml-2"> @RODRI</p>
            </div>
            <p className="font-ibmPlex text-xs flex items-center justify-end font-bold w-14 text-green">
              54 ETH
            </p>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-2">
            <p className="text-green text-4xl">2</p>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-2">
            <p className="text-green text-4xl">3</p>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-2">
            <p className="text-green text-4xl">4</p>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-2">
            <p className="text-green text-4xl">5</p>
          </div>
          <div className="cursor-pointer flex h-6 item-center w-min mt-2">
            <Image src={plus} height={10} width={20} alt={""} />
            <p className="font-ibmPlex text-xs ml-2 leading-none">
              SEE
              <br />
              ALL
            </p>
          </div>
        </div>

        <div className="">
          <h1>TOP 50 ARTIST SALES</h1>
          <div className="grid grid-cols-5 gap-3 mt-3">
            <p className="text-green text-4xl">1</p>
            <div className="col-span-3 flex items-center -ml-6">
              <Image src={profile} height={10} width={30} alt={""} />
              <p className="text-xs font-ibmPlex ml-2"> @RODRI</p>
            </div>
            <p className="font-ibmPlex text-xs flex items-center justify-end font-bold w-14 text-green">
              54 ETH
            </p>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-2">
            <p className="text-green text-4xl">2</p>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-2">
            <p className="text-green text-4xl">3</p>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-2">
            <p className="text-green text-4xl">4</p>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-2">
            <p className="text-green text-4xl">5</p>
          </div>
          <div className="cursor-pointer flex h-6 item-center w-min mt-2">
            <Image src={plus} height={10} width={20} alt={""} />
            <p className="font-ibmPlex text-xs ml-2 leading-none">
              SEE
              <br />
              ALL
            </p>
          </div>
        </div>
        <div className="">
          <h1>TOP 50 TOKEN HOLDERS</h1>
          <div className="grid grid-cols-5 gap-3 mt-3">
            <p className="text-green text-4xl">1</p>
            <div className="col-span-3 flex items-center -ml-6">
              <Image src={profile} height={10} width={30} alt={""} />
              <p className="text-xs font-ibmPlex ml-2"> @RODRI</p>
            </div>
            <p className="font-ibmPlex text-xs flex items-center justify-end font-bold w-14 text-green">
              54 ETH
            </p>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-2">
            <p className="text-green text-4xl">2</p>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-2">
            <p className="text-green text-4xl">3</p>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-2">
            <p className="text-green text-4xl">4</p>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-2">
            <p className="text-green text-4xl">5</p>
          </div>
          <div className="cursor-pointer flex h-6 item-center w-min mt-2">
            <Image src={plus} height={10} width={20} alt={""} />
            <p className="font-ibmPlex text-xs ml-2 leading-none">
              SEE
              <br />
              ALL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingComponent;
