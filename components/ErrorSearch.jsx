const ErrorSearch = () => {
  return (
    <p className='grow h-full flex flex-col justify-center items-center text-center text-gray-400 text-[1.5rem] max-w-[60%] min-w-max'>
      <span>
        Oops, something went wrong
        <span role='img' aria-level='thinking icon'>
          🤔
        </span>
      </span>
      Check if the address is correct!
    </p>
  );
};

export default ErrorSearch;
