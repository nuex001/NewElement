import React, { useState } from "react";
import ipfs from "../utils/Ipfs";
import axios from "axios";
const UploadComponent = () => {
  const [images, setImages] = useState<any>([]);
  const [id, setId] = useState<any>("");
  const [imageUrl, setImageUrl] = useState<any>("");

  async function readIPFSContent(hash: any) {
    try {
      // Fetch the content from IPFS
      const response = await axios.get(`https://ipfs.io/ipfs/${hash}`);
      if (response.data.length > !1) {
        throw new Error("Failed to fetch IPFS content");
      }
      const hashedImages = response.data.images;
      console.log(hashedImages);
      console.log(response.data.Id);
      let UnhashedImages = [];
      if (hashedImages.length > 1) {
        console.log(hashedImages.length > 1);
        for (let i = 0; i < hashedImages.length; i++) {
          const url = `https://ipfs.io/ipfs/${hashedImages[i]}`;
          setImageUrl(url);
          UnhashedImages.push(url);
        }

        console.log(UnhashedImages);
      }
      // const content = await response.data.images.text();

      // Do something with the content
      // console.log(content);
    } catch (error) {
      console.error("Error reading IPFS content:", error);
    }
  }

  const handleUpload = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const files = formData.getAll("images");
    const fileArray = Array.from(files);
    // console.log();
    if ((fileArray.length < 4 && fileArray.length > 1) || id !== "") {
      const uploadedImages = await Promise.all(
        fileArray.map(async (file) => {
          const { cid } = await ipfs.add(file);
          return cid.toString();
        })
      );
      setImages(uploadedImages);

      const enteredId = formData.get("texts");
      setId(enteredId);

      const data = {
        images: uploadedImages,
        Id: enteredId,
      };

      const { cid } = await ipfs.add(JSON.stringify(data));
      readIPFSContent(cid.toString());
      console.log("CID:", cid.toString());
    } else {
      console.log("Please Fill all inputs");
    }
  };

  return (
    <div>
      <h2>Upload Component</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" multiple name="images" />
        <textarea
          name="texts"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">Upload</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Fetched Image" />}
    </div>
  );
};

export default UploadComponent;
