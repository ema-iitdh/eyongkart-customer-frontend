import React from "react";
// import "./Item.css";
import { Link } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
const Item = (props) => {
  const navigate = useNavigate();
  console.log(
    `http://drive.google.com/thumbnail?id=${props?.img?.replace(/"/g, "")}`
  );

  return (
    <div className="item bg-gray-300 p-4 rounded-lg flex flex-col items-center justify-center">
      <Link to={`/product/${props.id}`}>
        <img
          // onClick={window.scrollTo(0, 0)}
          src={`http://drive.google.com/thumbnail?id=${props?.img?.replace(
            /"/g,
            ""
          )}`}
          alt=""
          className="h-full object-fill aspect-square"
        />
      </Link>
      <div className="w-full flex justify-between">
        <div>
          <p className="text-[18px]">{props.name}</p>

          <p className="text-[18px]">₹ {props.price}</p>
        </div>
        <button type="button" className="relative p-3">
          <GrFavorite className="text-xl text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default Item;
