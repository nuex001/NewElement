import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import banner from "../assets/banner.png";
import profile from "../assets/profile-2.png";
import star from "../assets/Star-PNG-Images.png";
import AvatarEditor from "react-avatar-editor";
import nft1 from "../assets/nft-1.jpeg";
import nft2 from "../assets/nft-2.jpeg";
import nft3 from "../assets/nft-3.webp";
import nft4 from "../assets/nft-4.jpeg";
import nft5 from "../assets/nft-5.jpeg";
import nft6 from "../assets/nft-6.jpeg";
import nft7 from "../assets/nft-7.png";
import nft10 from "../assets/nft-10.png";
import Link from "next/link";
import axios from "axios";
import Users from "../model/users";
import connectDB from "../lib/connectDB";

type Props = {
  cropperOpen: boolean;
  img: any;
  croppedImg: string | StaticImageData;
};

type User = {
  address: string;
  profilePicture: string;
};

export const getServerSideProps: GetServerSideProps<{
  user: any;
}> = async () => {
  await connectDB();
  console.log("Connected to Mongo");
  const address = "0x2E1b9630fB5b099625d45d8f7f4B382e49393394";
  const user = await Users.findOne({ address }).lean();

  console.log(user);

  return { props: { user } };
};

const ProfileComponent = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [editor, setEditor] = React.useState<any>(null);
  const [scaleValue, setScaleValue] = React.useState<number>(1);

  const [picture, setPicture] = useState<Props>({
    cropperOpen: false,
    img: null,
    croppedImg: profile,
  });
  const [bannerPicture, setBannerPicture] = useState<Props>({
    cropperOpen: false,
    img: null,
    croppedImg: banner,
  });
  const [file, setFile] = useState(null);

  const { mutateAsync: upload } = useStorageUpload();

  const onScaleChange = (e: any) => {
    const scaleValue = parseFloat(e.target.value);
    setScaleValue(scaleValue);
  };

  const handleCancel = () => {
    setPicture({
      ...picture,
      cropperOpen: false,
    });
  };
  const setEditorRef = (editor: any) => setEditor(editor);

  const uploadToIpfs = async () => {
    setLoading(true);
    const uploadUrl = await upload({
      data: [file],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });

    setLoading(false);
    if (uploadUrl) {
      let imgUrl;
      axios
        .post("/api/updateProfile", { imgUrl: uploadUrl[0] })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  };

  const handleSave = (e: any) => {
    if (editor) {
      const canvasScaled = editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      setPicture({
        ...picture,
        img: null,
        cropperOpen: false,
        croppedImg: croppedImg,
      });

      uploadToIpfs();
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      console.log(url);
      setPicture({
        ...picture,
        img: url,
      });
      setFile(file);
    }
  };
  const handleOpenCropper = () => {
    setPicture({
      ...picture,

      cropperOpen: true,
    });
  };

  // Banner image upload

  const handleCancelBanner = () => {
    setBannerPicture({
      ...bannerPicture,
      cropperOpen: false,
    });
  };
  const setEditorRefBanner = (editor: any) => setEditor(editor);

  const handleSaveBanner = (e: any) => {
    if (editor) {
      const canvasScaled = editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();

      setBannerPicture({
        ...bannerPicture,
        img: null,
        cropperOpen: false,
        croppedImg: croppedImg,
      });
    }
  };

  const handleFileChangeBanner = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      console.log(url);
      setBannerPicture({
        ...bannerPicture,
        img: url,
      });
    }
  };
  const handleOpenCropperBanner = () => {
    setBannerPicture({
      ...bannerPicture,
      cropperOpen: true,
    });
  };
  // console.log(user);
  return (
    <div className="flex flex-col w-full max-w-[1590px] px-4 md:px-3 lg:px-6 mt-20 md:mt-24  bg-black overflow-hidden">
      <div className="flex flex-col w-full font-ibmPlex ">
        <label
          className="cursor-pointer"
          htmlFor="input-banner"
          onClick={handleOpenCropperBanner}
        >
          <Image
            src={bannerPicture.croppedImg}
            width={1600}
            height={200}
            alt="banner"
            className="h-[12vh] md:h-[14vh] object-cover "
          />
          <input
            id="input-banner"
            className="text-xs hidden"
            type="file"
            accept="image/*"
            onChange={handleFileChangeBanner}
          />
        </label>
        <div className="w-fit border border-green flex flex-col align-center">
          {bannerPicture.cropperOpen && (
            <div className="flex flex-col items-center">
              {/* <input
                className="text-xs"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              /> */}
              {bannerPicture.img && (
                <>
                  <AvatarEditor
                    className="w-screen"
                    ref={setEditorRefBanner}
                    image={bannerPicture.img}
                    width={300}
                    height={50}
                    border={50}
                    color={[1, 1, 1, 0.5]} // RGBA
                    rotate={0}
                    scale={scaleValue}
                  />
                  <input
                    className="w-full h-2 mt-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    type="range"
                    value={scaleValue}
                    name="points"
                    step={0.25}
                    min="1"
                    max="10"
                    onChange={onScaleChange}
                  />
                  <div className="flex w-full justify-around">
                    <button
                      className=" text-green font-compressed uppercase border border-green tracking-[6px] w-[40%] my-2 bg-white bg-opacity-20 hover:bg-opacity-40 font-semibold "
                      onClick={handleSaveBanner}
                    >
                      Save
                    </button>
                    <button
                      className=" text-green font-xxCompressed uppercase border border-green tracking-[6px] w-[40%] my-2 bg-white bg-opacity-20 hover:bg-opacity-40 font-semibold "
                      onClick={handleCancelBanner}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex w-full -mt-4">
          <label
            className="cursor-pointer"
            htmlFor="input-profile"
            onClick={handleOpenCropper}
          >
            <Image
              className="border border-green rounded-full"
              src={picture.croppedImg}
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
        <div className="w-fit border border-green flex flex-col align-center">
          {picture.cropperOpen && (
            <div className="flex flex-col items-center">
              <input
                id="input-profile"
                className="text-xs hidden"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {picture.img && (
                <>
                  <AvatarEditor
                    ref={setEditorRef}
                    image={picture.img}
                    width={200}
                    height={200}
                    border={50}
                    borderRadius={100}
                    color={[1, 1, 1, 0.5]} // RGBA
                    rotate={0}
                    scale={scaleValue}
                  />
                  <input
                    className="w-full h-2 mt-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    type="range"
                    value={scaleValue}
                    name="points"
                    step={0.25}
                    min="1"
                    max="10"
                    onChange={onScaleChange}
                  />
                  <div className="flex w-full justify-around">
                    <button
                      className=" text-green font-compressed uppercase border border-green tracking-[6px] w-[40%] my-2 bg-white bg-opacity-20 hover:bg-opacity-40 font-semibold "
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className=" text-green font-xxCompressed uppercase border border-green tracking-[6px] w-[40%] my-2 bg-white bg-opacity-20 hover:bg-opacity-40 font-semibold "
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col w-full mt-4 text-left text-xs">
          <h1 className="text-2xl mb-3 font-bold">JOH KANE</h1>
          <p>
            Hi all, I&apos;m Ahad aka wiresandtrees, I&apos;m a freelance artist
            and architect (RIBA Part II) based in the UK. I love visually
            exploring the state between &apos;dreams&apos; and
            &apos;nightmares&apos;.
          </p>
        </div>
        <div className="flex  flex-col-reverse md:flex-col">
          <div className="flex md:mt-5 h-full flex-wrap">
            <div className="flex flex-col mr-10 w-16">
              <h1 className="text-green font-xxCompressed -mb-2 text-8xl  lg:text-9xl text-center">
                5
              </h1>
              <p className="text-xs">
                TOTAL
                <br /> LISTED
              </p>
            </div>
            <div className="flex flex-col mr-10 w-16">
              <h1 className="text-green font-xxCompressed -mb-2 text-8xl lg:text-9xl text-center">
                2
              </h1>
              <p className="text-xs">
                TOTAL
                <br /> SOLD
              </p>
            </div>
            <div className="flex grow md:hidden"></div>

            <div className="flex flex-col items-end md:items-center mr-2 md:mr-10 w-16">
              <h1 className="text-green font-xxCompressed -mb-2 text-8xl lg:text-9xl text-center">
                0.1
              </h1>
              <p className="text-xs">
                PROFIT
                <br /> IN ETH
              </p>
            </div>
            <div className="basis-full h-0"></div>
            <div className="flex flex-col mr-10 w-16">
              <h1 className="text-green font-xxCompressed -mb-2 text-8xl lg:text-9xl text-center">
                4
              </h1>

              <p className="text-xs">
                TOTAL
                <br /> COLLECTED
              </p>
            </div>
            <div className="flex flex-col mr-10 w-16">
              <h1 className="text-green font-xxCompressed -mb-2 text-8xl lg:text-9xl text-center">
                4
              </h1>
              <p className="text-xs">
                TOTAL
                <br /> FLIPPED
              </p>
            </div>
            <div className="flex grow md:hidden"></div>
            <div className="flex flex-col mr-2 md:mr-10 w-16 items-end md:items-center">
              <h1 className="text-green font-xxCompressed -mb-2 text-8xl lg:text-9xl text-center">
                1.1
              </h1>
              <p className="text-xs">
                P/L
                <br /> IN ETH
              </p>
            </div>
          </div>
          <div className="flex overflow-hidden md:w-[60%]">
            <button className=" text-green font-xCompressed w-full  font-bold border border-green tracking-[10px] md:tracking-[12px] lg:w-[40%] mt-8 mb-5 md:my-10 bg-white bg-opacity-20 hover:bg-opacity-40 py-1 lg:py-[1.2vh] text-2xl  ">
              <Link href="/profile/mint"> LIST NEW </Link>
            </button>
          </div>{" "}
        </div>
        <div className="flex flex-col font-ibmPlex mt-10 md:mt-0 text-left">
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

          {/* SOLD */}
          <div className="flex flex-col">
            <h3 className="font-bold">SOLD</h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 items-stretch gap-4 mb-10 mt-4">
              {/* nft 1 */}
              <div className="flex  flex-col h-full items-start w-max ">
                <div className="">
                  <Image
                    src={nft1}
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
                        Sale <br /> Price
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
                      <p className="pr-6  ">Owner</p>
                      <div className="flex grow"></div>
                      <p className="font-bold text-green">@Rodri</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* nft 2 */}
              <div className="flex  flex-col h-full items-start w-max ">
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
                        Sale <br /> Price
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
                      <p className="pr-6  ">Owner</p>
                      <div className="flex grow"></div>
                      <p className="font-bold text-green">@Rodri</p>
                    </div>
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
              {/* nft 2 */}
            </div>
          </div>
          {/* SAVED */}
          <div className="flex flex-col">
            <h3 className="font-bold">SAVED</h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 items-stretch gap-4 mb-10 mt-4">
              {/* nft 1 */}
              <div className="flex  flex-col h-full items-start w-max ">
                <div className="">
                  <Image
                    src={nft5}
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
              {/* nft 2 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
