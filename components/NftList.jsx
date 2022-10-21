import { Ring } from "@uiball/loaders";
import NftCard from "./NftCard";

const NftList = ({ nfts }) => {
  return (
    <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
      {nfts && nfts.map((nft, i) => <NftCard key={i} nft={nft} />)}
    </div>
  );
};

export default NftList;
