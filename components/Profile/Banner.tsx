import React, { useState } from "react";
import Image from "next/image";
import AvatarEditor from "react-avatar-editor";
import banner from "../../assets/banner.png";
import ipfs from "../utils/Ipfs";
import axios from "axios";
import UploadComponent from "./UploadComponent";

type Props = {
  authedProfile: any;
  setBannerPicture: React.Dispatch<React.SetStateAction<any>>;
  bannerPicture: any;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  uploadToIpfs: (bannerPicture: any) => void;
  setEditor: React.Dispatch<React.SetStateAction<any>>;
  handleFileChange: (e: any) => void;
};

const Banner = ({
  authedProfile,
  setBannerPicture,
  setEditor,
  bannerPicture,
  uploadToIpfs,
  setFile,
}: Props) => {
  const [images, setImages] = useState<any>([]);
  const [id, setId] = useState<any>("");
  const [imageUrl, setImageUrl] = useState<any>("");
  // const [file, setFile] = useState<any>(null);
  // IPFS upload infura
  // const handleUpload = async (fileArray: any) => {
  //   // event.preventDefault();

  //   // const formData = new FormData(event.target);
  //   // const files = formData.getAll("images");
  //   // const fileArray = Array.from(files);
  //   // // console.log();
  //   if ((fileArray.length < 4 && fileArray.length > 1) || id !== "") {
  //     const uploadedImages = await Promise.all(
  //       fileArray.map(async (file: any) => {
  //         const { cid } = await ipfs.add(file);
  //         return cid.toString();
  //       })
  //     );
  //     setImages(uploadedImages);

  //     const enteredId = formData.get("texts");
  //     setId(enteredId);

  //     const data = {
  //       images: uploadedImages,
  //       Id: enteredId,
  //     };

  //     const { cid } = await ipfs.add(JSON.stringify(data));
  //     readIPFSContent(cid.toString());
  //     console.log("CID:", cid.toString());
  //   } else {
  //     console.log("Please Fill all inputs");
  //   }
  // };

  // async function readIPFSContent(hash: any) {
  //   try {
  //     // Fetch the content from IPFS
  //     const response = await axios.get(`https://ipfs.io/ipfs/${hash}`);
  //     if (response.data.length > !1) {
  //       throw new Error("Failed to fetch IPFS content");
  //     }
  //     const hashedImages = response.data.images;
  //     console.log(hashedImages);
  //     console.log(response.data.Id);
  //     let UnhashedImages = [];
  //     if (hashedImages.length > 1) {
  //       console.log(hashedImages.length > 1);
  //       for (let i = 0; i < hashedImages.length; i++) {
  //         const url = `https://ipfs.io/ipfs/${hashedImages[i]}`;
  //         setImageUrl(url);
  //         UnhashedImages.push(url);
  //       }

  //       console.log(UnhashedImages);
  //     }
  //     // const content = await response.data.images.text();

  //     // Do something with the content
  //     // console.log(content);
  //   } catch (error) {
  //     console.error("Error reading IPFS content:", error);
  //   }
  // }

  // Banner image upload
  const handleCancelBanner = () => {
    setBannerPicture({
      ...bannerPicture,
      img: null,
      cropperOpen: false,
    });
  };
  const setEditorRefBanner = (editor: any) => setEditor(editor);

  const handleSaveBanner = () => {
    const croppedImg = bannerPicture.img;
    setBannerPicture({
      ...bannerPicture,
      img: null,
      cropperOpen: false,
      croppedImg: croppedImg,
    });

    uploadToIpfs(bannerPicture);
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
      setFile(file);
    }
  };
  const handleOpenCropperBanner = () => {
    setBannerPicture({
      ...bannerPicture,
      cropperOpen: true,
    });
  };
  console.log(authedProfile.bannerPicture);

  return (
    <>
      <label
        className="cursor-pointer"
        htmlFor="input-banner"
        onClick={handleOpenCropperBanner}
      >
        <Image
          src={
            authedProfile.bannerPicture == ""
              ? banner
              : authedProfile?.bannerPicture
          }
          width={1600}
          height={200}
          alt="banner"
          className="h-[12vh] md:h-[14vh]  object-cover  overflow-hidden z-0 border border-transparent hover:border-green"
        />

        <input
          id="input-banner"
          className="text-xs hidden"
          type="file"
          accept="image/*"
          onChange={handleFileChangeBanner}
        />
      </label>
      {/* <UploadComponent /> */}
      <div className="w-fit border border-green overflow-hidden flex flex-col align-center">
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
                  scale={1}
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
    </>
  );
};

export default Banner;
