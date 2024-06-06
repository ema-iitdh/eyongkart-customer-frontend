import React from "react";
// import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  console.log(
    `http://drive.google.com/thumbnail?id=${props?.img?.replace(/"/g, "")}`
  );

  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img
          // onClick={window.scrollTo(0, 0)}
          src={`http://drive.google.com/thumbnail?id=${props?.img?.replace(
            /"/g,
            ""
          )}`}
          alt=""
        />
      </Link>
      <p>{props.title}</p>
      <div className="item-prices">
        <div className="item-price-new">Rs. {props.price}</div>
      </div>
    </div>
  );
};

export default Item;
