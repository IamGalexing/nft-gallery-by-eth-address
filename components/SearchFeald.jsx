import { useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import ImgNextArrow from "../public/ImgNextArrow.jsx";

const SearchField = ({ handleNfts, isFieldsEmpty }) => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [nextPagesKey, setNextPagesKey] = useState("");

  const fetchNFT = async (e) => {
    const alchemy = new Alchemy({
      apiKey: process.env.API_KEY,
      network: Network.ETH_MAINNET,
    });
    try {
      const nfts = await alchemy.nft.getNftsForOwner(wallet, {
        pageSize: 12,
        pageKey: e.target.innerHTML === "Let's go" ? "" : nextPagesKey,
        contractAddresses: collection ? [collection] : [],
      });

      nfts.pageKey ? setNextPagesKey(nfts.pageKey) : setNextPagesKey("");
      handleNfts(nfts.ownedNfts);
    } catch {
      handleNfts([]);
      setNextPagesKey("");
    }
    isFieldsEmpty(false);
  };

  const fetchNftForCollection = async (e) => {
    const alchemy = new Alchemy({
      apiKey: process.env.API_KEY,
      network: Network.ETH_MAINNET,
    });
    console.log("check");
    console.log("nextpagekey", nextPagesKey);
    try {
      const nfts = await alchemy.nft.getNftsForContract(collection, {
        pageSize: 12,
        pageKey: e.target.innerHTML === "Let's go" ? "" : nextPagesKey,
      });

      nfts.pageKey ? setNextPagesKey(nfts.pageKey) : setNextPagesKey("");
      handleNfts(nfts.nfts);
    } catch {
      handleNfts([]);
      setNextPagesKey("");
    }
    isFieldsEmpty(false);
  };

  const handleFetchNft = (e) => {
    if (fetchForCollection && collection) {
      fetchNftForCollection(e);
    } else if (!fetchForCollection && wallet) {
      fetchNFT(e);
    } else {
      isFieldsEmpty(true);
      handleNfts([]);
      setNextPagesKey("");
    }
  };

  return (
    <div className='self-center flex flex-col items-center justify-center w-5/6 gap-y-2'>
      <input
        disabled={fetchForCollection}
        onChange={(e) => setWalletAddress(e.target.value)}
        value={wallet}
        type='text'
        placeholder='Add you wallet address'
        className='md:w-3/6 w-4/6 bg-slate-200 p-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-gray-50'
      />
      <input
        onChange={(e) => setCollectionAddress(e.target.value)}
        disabled={fetchForCollection === true ? false : wallet === ""}
        value={collection}
        type='text'
        placeholder='Add the collection address'
        className='md:w-3/6 w-4/6 bg-slate-200 p-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-gray-50'
      />
      <label className='text-gray-600 cursor-pointer'>
        <input
          onChange={(e) => setFetchForCollection(e.target.checked)}
          type='checkbox'
          className='mr-2 cursor-pointer'
        />{" "}
        Fetch for collection
      </label>
      <button
        onClick={handleFetchNft}
        type='button'
        className='disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm md:w-1/5 w-2/6 hover:bg-blue-500'
      >
        Let's go
      </button>
      {nextPagesKey && (
        <button
          onClick={handleFetchNft}
          type='button'
          className='text-white flex-wrap place-self-end absolute top-[27%] sm:right-[18%] right-[21%]'
        >
          <ImgNextArrow />
        </button>
      )}
    </div>
  );
};

export default SearchField;
