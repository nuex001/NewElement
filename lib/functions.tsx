import avatar from "../assets/avatar.gif";

export let artistNameOrAddress: any;
export let artistProfilePic: any;
export let user: any;
export const getArtist = (users: any, listing: any) => {
  user = users.find((user: any) => user.address === listing.seller);

  artistNameOrAddress = user
    ? user.username
    : listing.seller.slice(0, 3).concat("...").concat(listing.seller.slice(-4));

  artistProfilePic = user?.profilePicture ? user.profilePicture : avatar;
};