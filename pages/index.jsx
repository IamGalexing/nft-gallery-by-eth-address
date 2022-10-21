import { useState } from "react";
import Head from "next/head";
import NftList from "../components/NftList";
import SearchField from "../components/SearchFeald";
import Welcome from "../components/Welcome";
import ErrorSearch from "../components/ErrorSearch";

const Home = () => {
  const [NFTs, setNFTs] = useState([]);
  const [isFieldsEmpty, setIsFieldsEmpty] = useState(true);

  return (
    <>
      <Head>
        <title>NFT gallery</title>
        <meta name='description' content='The best nft explorer app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center justify-start py-8 gap-y-3 bg-slate-900 min-h-screen'>
        <SearchField handleNfts={setNFTs} isFieldsEmpty={setIsFieldsEmpty} />
        {isFieldsEmpty ? (
          <Welcome />
        ) : NFTs.length ? (
          <NftList nfts={NFTs} />
        ) : (
          <ErrorSearch />
        )}
      </main>
    </>
  );
};

export default Home;
