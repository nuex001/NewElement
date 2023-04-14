import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import banner from "../assets/banner.png";
import profile from "../assets/profile-2.png";
import star from "../assets/Star-PNG-Images.png";
import AvatarEditor from "react-avatar-editor";

type Props = {
  cropperOpen: boolean;
  img: any;
  croppedImg: string | StaticImageData;
};

const ProfileComponent = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [editor, setEditor] = React.useState<any>(null);
  const [scaleValue, setScaleValue] = React.useState<number>(1);
  const [picture, setPicture] = useState<Props>({
    cropperOpen: false,
    img: null,
    croppedImg: profile,
  });

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
    }
  };

  const handleFileChange = (e: any) => {
    let url = URL.createObjectURL(e.target.files[0]);
    console.log(url);
    setPicture({
      ...picture,
      img: url,
    });
  };
  const handleOpneCropper = () => {
    setPicture({
      ...picture,

      cropperOpen: true,
    });
  };
  return (
    <div className="flex flex-col w-[98dvw]  mt-24  bg-black overflow-hidden">
      <div className="flex flex-col w-full h-full  md:px-16 font-ibmPlex">
        <Image
          className="self-center"
          src={banner}
          width={1200}
          height={200}
          alt="banner"
        />
        <div className="flex w-full -mt-4">
          <button onClick={handleOpneCropper}>
            <Image
              className="border border-green rounded-full"
              src={picture.croppedImg}
              width={70}
              height={70}
              alt="profile"
            />
          </button>
          <Image
            className="ml-4 h-5 self-center"
            src={star}
            width={20}
            height={10}
            alt="star"
          />
          <p className="text-xs self-center">ARTIST</p>
        </div>
        <div className="w-fit border border-green flex flex-col align-center">
          {picture.cropperOpen && (
            <div className="flex flex-col items-center">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {picture.img && (
                <>
                  <AvatarEditor
                    ref={setEditorRef}
                    image={picture.img}
                    width={200}
                    height={200}
                    // border={50}
                    borderRadius={100}
                    color={[255, 255, 255, 0.2]} // RGBA
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
            Hi all, I'm Ahad aka wiresandtrees, I'm a freelance artist and
            architect (RIBA Part II) based in the UK. I love visually exploring
            the state between 'dreams' and 'nightmares'.
          </p>
        </div>

        <div className="flex mt-5 h-full flex-wrap">
          <div className="flex flex-col mr-10 w-16">
            <h1 className="text-green font-xxCompressed -mb-2 text-9xl text-center">
              5
            </h1>
            <p className="text-xs">
              TOTAL
              <br /> LISTED
            </p>
          </div>
          <div className="flex flex-col mr-10 w-16">
            <h1 className="text-green font-xxCompressed -mb-2 text-9xl text-center">
              2
            </h1>
            <p className="text-xs">
              TOTAL
              <br /> SOLD
            </p>
          </div>
          <div className="flex flex-col mr-10 w-16">
            <h1 className="text-green font-xxCompressed -mb-2 text-9xl text-center">
              0.1
            </h1>
            <p className="text-xs">
              PROFIT
              <br /> IN ETH
            </p>
          </div>
          <div className="basis-full h-0"></div>
          <div className="flex flex-col mr-10 w-16">
            <h1 className="text-green font-xxCompressed -mb-2 text-9xl text-center">
              4
            </h1>

            <p className="text-xs">
              TOTAL
              <br /> COLLECTED
            </p>
          </div>
          <div className="flex flex-col mr-10 w-16">
            <h1 className="text-green font-xxCompressed -mb-2 text-9xl text-center">
              4
            </h1>
            <p className="text-xs">
              TOTAL
              <br /> FLIPPED
            </p>
          </div>
          <div className="flex flex-col mr-10 w-16">
            <h1 className="text-green font-xxCompressed -mb-2 text-9xl text-center">
              1.1
            </h1>
            <p className="text-xs">
              P/L
              <br /> IN ETH
            </p>
          </div>
        </div>
        <div className="flex overflow-hidden">
          <button className=" text-green font-compressed  border border-green tracking-[12px] w-[40%] my-10 bg-white bg-opacity-20 hover:bg-opacity-40 font-semibold  py-[1.2vh] text-xl  ">
            LIST NEW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
