import { useState, useEffect } from "react";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import imageExists from "image-exists";
import ReactTooltip from "react-tooltip";
import NoImage from "../public/noImage.jpg";
import CopyIcon from "../public/copy.svg";

const NftCard = ({ nft }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopiedToolbar = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  useEffect(() => {
    const mediaUrl = nft.media[0]?.gateway;
    const rawMetadata = nft.rawMetadata?.image;
    let result = "";

    if (mediaUrl?.includes("https")) {
      result = mediaUrl;
    } else if (
      rawMetadata?.includes("https") &&
      !rawMetadata?.includes("ipfs")
    ) {
      result = rawMetadata;
    }
    imageExists(result, (excist) => {
      if (excist) {
        setImageUrl(result);
      } else {
        setImageUrl("");
      }
    });
  }, [nft]);

  return (
    <div className='w-1/4 min-w-min flex flex-col'>
      <div className='rounded-md -mb-2 '>
        {!!imageUrl ? (
          <img
            src={imageUrl}
            className='object-cover h-128 w-full rounded-t-md mb-2'
          />
        ) : (
          <Image
            src={NoImage}
            className='object-cover h-128 w-full rounded-t-md'
            alt='nft image'
          />
        )}
      </div>

      <div className='flex flex-col y-gap-2 px-2 py-3 bg-slate-200 rounded-b-md  text-center h-full justify-between'>
        <div className='text-center'>
          <h3 className='text-lg font-bold mb-2'>{nft.title || "No title"}</h3>
          <p className='text-sm font-medium'>
            ID:{" "}
            {nft.tokenId.length > 5
              ? `${nft.tokenId.substr(0, 5)}...`
              : +nft.tokenId}
          </p>

          <CopyToClipboard
            text={nft.contract.address}
            onCopy={() => {
              handleCopiedToolbar();
              ReactTooltip.hide();
              ReactTooltip.rebuild();
            }}
          >
            <p
              className='flex justify-center align-middle text-sm cursor-pointer font-medium -ml-2'
              data-tip={isCopied ? "Copied" : "Copy address"}
            >
              <Image src={CopyIcon} height='20' width='20' />

              {nft.contract?.address &&
                `${nft.contract.address.substr(
                  0,
                  6
                )}...${nft.contract.address.substr(
                  nft.contract.address.length - 4
                )}`}
            </p>
          </CopyToClipboard>
          <ReactTooltip effect='solid' />
          <p className='text-gray-600 mb-2 mt-3 leading-tight'>
            {nft.description?.substr(0, 150)}
          </p>
        </div>

        <div className='mb-2 mt-4 min-w-max '>
          <a
            target='_blank'
            href={`https://etherscan.io/token/${nft.contract.address}`}
            className='py-2 px-4 bg-blue-400 rounded-sm text-white cursor-pointer hover:bg-blue-500'
          >
            View on etherscan
          </a>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
