import { useState } from "react";

const ImgNextArrow = (props) => {
  const [color, setColor] = useState("#60A5FA");
  return (
    <div
      className='hover:scale-105'
      onMouseOver={() => setColor("#3b82f6")}
      onMouseLeave={() => setColor("#60A5FA")}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 492.004 492.004'
        fill={color}
        width='30px'
        height='30px'
        {...props}
      >
        <path d='M490.544 242.989 229.188 35.717a3.812 3.812 0 0 0-4.04-.448 3.818 3.818 0 0 0-2.152 3.46v76.552H3.72c-2.124 0-3.72 2.064-3.72 4.184v253.592c0 2.128 1.592 3.664 3.72 3.664h219.276v76.552c0 1.476.82 2.824 2.152 3.464.528.252 1.092.38 1.664.38.848 0 1.692-.284 2.384-.832l261.36-207.268a3.853 3.853 0 0 0-.012-6.028z' />
      </svg>
    </div>
  );
};

export default ImgNextArrow;
