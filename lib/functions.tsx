import avatar from "../assets/avatar.gif";

export let artistNameOrAddress: any;
export let artistProfilePic: any;
export let owner: any;
export const getArtist = (users: any, listing: any) => {
  owner = users.find((user: any) => user.address === listing.seller);

  artistNameOrAddress = owner
    ? owner?.username
    : listing?.seller
        ?.slice(0, 3)
        .concat("...")
        .concat(listing.seller.slice(-4));

  artistProfilePic = owner?.profilePicture ? owner.profilePicture : avatar;
};
