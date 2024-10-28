import React, { useState } from "react";

import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
const PricesSort = () => {
  const [isPricesOpen, setIsPricesOpen] = useState(false);
  return (
    <div>
      <div className="w-full md:w-auto mt-4">
        <div className="flex items-center justify-between md:justify-start">
          <h3 className="sm:text-lg text-[13px] uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Prices
          </h3>

          <button
            type="button"
            className="md:hidden text-slate-500"
            onClick={() => setIsPricesOpen(!isPricesOpen)}
            aria-label="Toggle Sort By Dropdown"
          >
            {isPricesOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
          </button>
        </div>

        <form
          className={`text-sm flex flex-col gap-2 py-2 ${
            isPricesOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="flex items-center gap-3">
            <input type="radio" name="sortBy" id="lowToHigh" />
            <label className="text-xs md:text-sm" htmlFor="lowToHigh">
              Less - ₹1200
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input type="radio" name="sortBy" id="highToLow" />
            <label className="text-xs md:text-sm" htmlFor="highToLow">
              ₹1200 - ₹1800
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input type="radio" name="sortBy" id="highToLow" />
            <label className="text-xs md:text-sm" htmlFor="highToLow">
              ₹1800 - ₹2200
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input type="radio" name="sortBy" id="highToLow" />
            <label className="text-xs md:text-sm" htmlFor="highToLow">
              ₹2200 - ₹3000
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input type="radio" name="sortBy" id="highToLow" />
            <label className="text-xs md:text-sm" htmlFor="highToLow">
              ₹3000 - ₹3800
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input type="radio" name="sortBy" id="highToLow" />
            <label className="text-xs md:text-sm" htmlFor="highToLow">
              ₹3800 - ₹4200
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input type="radio" name="sortBy" id="highToLow" />
            <label className="text-xs md:text-sm" htmlFor="highToLow">
              ₹4200 - ₹5000
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input type="radio" name="sortBy" id="highToLow" />
            <label className="text-xs md:text-sm" htmlFor="highToLow">
              ₹5000 and Above
            </label>
          </div>
        </form>
      </div>
    </div>

    //     <div className="w-full md:w-auto mt-4">
    //     <div className="flex items-center justify-between md:justify-start">
    //       <h3 className="sm:text-lg text-[13px] uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
    //         Prices
    //       </h3>

    //       <button
    //         type="button"
    //         className="md:hidden text-slate-500"
    //         onClick={() => setIsPricesOpen(!isPricesOpen)}
    //         aria-label="Toggle Collection Dropdown"
    //       >
    //         {isPricesOpen ? (
    //           <RiArrowDropUpLine />
    //         ) : (
    //           <RiArrowDropDownLine />
    //         )}
    //       </button>
    //     </div>
    //     <form
    //       className={`text-sm flex flex-col gap-2 py-2 ${
    //         isPricesOpen ? "block" : "hidden"
    //       } md:block`}
    //     >
    //       {products?.map((product) => (
    //         <div
    //           key={product._id}
    //           className="flex items-center gap-3 p-2 md:p-0"
    //         >
    //           <input
    //             type="checkbox"
    //             name="collection"
    //             id={product._id}
    //             className="w-4 h-4"
    //           />
    //           <label
    //             htmlFor={product._id}
    //             className="text-xs md:text-sm"
    //           >
    //             ₹ {product.price}
    //           </label>
    //         </div>
    //       ))}
    //     </form>
    //   </div>
  );
};

export default PricesSort;
