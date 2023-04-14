import React from "react";
import AvatarEditor from "react-avatar-editor";

type Props = {
  open: boolean;
  setEditorRef: (ref: any) => void;
  onCrop: () => void;
  scaleValue: number;
  onScaleChange: (e: any) => void;
  imageSrc: string;
};

const ImageCrop = ({
  imageSrc,
  onCrop,
  setEditorRef,
  scaleValue,
  onScaleChange,
}: Props) => (
  <div>
    <div className="flex flex-col it">
      <div className="editorModalContent clearfix">
        <div className="w-full m-0 ">
          <AvatarEditor
            position={{ x: 0.5, y: 0.5 }}
            image={imageSrc}
            border={20}
            borderRadius={100}
            scale={scaleValue}
            rotate={0}
            ref={setEditorRef}
          />
          <input
            style={{ width: "100%" }}
            type="range"
            value={scaleValue}
            name="points"
            min="1"
            max="5"
            onChange={onScaleChange}
          />
          <button onClick={onCrop} className="editorOverlayCloseBtn crpBtn">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ImageCrop;
