import React from "react";
import Image from "next/image";
import avatar from "../../assets/avatar.gif";
import star from "../../assets/star.png";
import AvatarEditor from "react-avatar-editor";

type Props = {};

const ProfileImage = ({
  authedProfile,
  setPicture,
  setEditor,
  picture,
  uploadToIpfs,
  handleOpenCropper,
  setFile,
  isArtist,
  handleFileChange,
}: any) => {
  const handleCancel = () => {
    setPicture({
      ...picture,
      cropperOpen: false,
    });
  };
  const setEditorRef = (editor: any) => setEditor(editor);
  const handleSave = (e: any) => {
    const croppedImg = picture.img;

    setPicture({
      ...picture,
      img: null,
      cropperOpen: false,
      croppedImg: croppedImg,
    });

    uploadToIpfs(picture);
  };

  return (
    <>
      <div className="flex w-full -mt-4">
        <label
          className="cursor-pointer"
          htmlFor="input-profile"
          onClick={handleOpenCropper}
        >
          <Image
            className="border border-green rounded-full hover:brightness-125 bg-black z-10 object-center object-cover aspect-square"
            src={
              authedProfile
                ? authedProfile?.profilePicture !== ""
                  ? authedProfile?.profilePicture
                  : avatar
                : avatar
            }
            width={70}
            height={70}
            alt="profile"
          />
        </label>
        {isArtist ? (
          <>
            <Image
              className="ml-4 mb-1 h-5 w-auto self-center"
              src={star}
              width={20}
              height={10}
              alt="star"
            />
            <p className="text-xs pl-1 font-bold tracking-wider self-center">
              ARTIST
            </p>{" "}
          </>
        ) : null}
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
                  scale={1}
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
    </>
  );
};

export default ProfileImage;
