const ErrorSearch = () => {
  return (
    <p className='grow h-full flex flex-col justify-center items-center text-center text-gray-400 text-[1.5rem] max-w-[60%] min-w-max'>
      <span>
        Oops, the address is wrong
        <span role='img' aria-level='thinking icon'>
          🤔
        </span>
      </span>
      or You have no NFTs!
    </p>
  );
};

export default ErrorSearch;
