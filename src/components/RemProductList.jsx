import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../../api";

function RemProductList() {
  const { categoryId } = useParams("categoryId");

  const {
    data: productList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getProductsCategoryById", "66d98674d6c1306ddc1088a4"],
    queryFn: () =>
      instance(`/product/getProductsCategoryById?id=${categoryId}`),
  });

  if (isLoading) return <>Loading...</>;

  if (isError) return <div>Error: {error?.message}</div>;

  console.log(productList);

  if (productList?.data?.products?.length === 0)
    return (
      <div className="flex justify-center items-center">
        No products found for this category
      </div>
    );

  return (
    <div>
      Product List
      <Link to="/productList/:categoryId">
        {productList?.data?.products?.map((product) => (
          <>
            <div>{product?.name}</div>
          </>
        ))}
      </Link>
    </div>
  );
}

export default RemProductList;

//  <div className="ml-3 ">
//                 <p className="text-red-400">Top</p>
//                 <div className="ml-8 text-[15px]">
//                 <p>Half </p>
//                       <p>Full</p>
//                       <CategoryOption
//                       title="Women"
//                       data={isLoadingWomenCategory ? [] : womenCategory?.data}
//                     />
//                     {/* </div> */}
//                     {/* </div> */}

//                     <div className=" ">
//                       <p className="text-red-400">Blouse</p>
//                       <div className="ml-8 text-[15px]">
//                       <p>Half </p>
//                           <p>Full</p>
//                       <CategoryOption
//                         // title="Women"
//                         data={
//                           isLoadingWomenCategory ? [] : womenCategory?.data
//                         }
//                       />
//                       {/* </div> */}
//                     </div>
//                     {/* </div> */}

//                     <div className=" ">
//                       <p className="text-red-400">Rani phee</p>
//                       {/* <div className="ml-8 text-[15px]"> */}
//                       {/* <p>Maraktaibi Border</p>
//                         <p>Rani Muka Suit</p>
//                         <p>Rani Manao Border </p>
//                         <p>Rani Muka Suit Border</p>
//                         <p>Rani Full</p>
//                         <p>Rani Manao</p>
//                         <p>Rani Ningam samji</p>
//                         <p>Rani Kheiroi Thekpa</p>
//                         <p>Rani Lamthang Khulak</p>
//                         <p>Rani Moirang Phijang</p>
//                         <p>Rani Angom mayek</p> */}
//                       <CategoryOption
//                         // title="Rani phee"
//                         data={
//                           isLoadingWomenCategory ? [] : womenCategory?.data
//                         }
//                       />
//                       {/* </div> */}
//                     </div>

//                     <div className="">
//                       <p className="text-red-400">Muga Suit</p>
//                       {/* <div className="ml-8 text-[15px]"> */}
//                       {/* <p>Muga Suit </p>
//                         <p>Muga Border Chatpa</p>
//                         <p>Muga Ningam samji</p>
//                         <p>Muga Kheiroi Thekpa</p>
//                         <p>Muga Lamthang Khulak</p>
//                         <p>Muga Moirang Phijang</p>
//                         <p>Muga Angom mayek</p> */}
//                       <CategoryOption
//                         // title="Women"
//                         data={
//                           isLoadingWomenCategory ? [] : womenCategory?.data
//                         }
//                       />
//                       {/* </div> */}
//                     </div>
//                     <div className="">
//                       <p className="text-blue-400">Phanek</p>
//                       {/* <div className="ml-8 text-[15px]"> */}
//                       {/* <p>Thambal Leikhok</p>
//                         <p>Khwang Pheege Sabi</p>
//                         <p>Pheege Sabi</p>
//                         <p>Pheege Mafen Khwang Phanek</p>
//                         <p>Khurkhul Manao Phanek</p>
//                         <p>Leni Muga Phanek</p>
//                         <p>Pashmina Muga Phanek</p>
//                         <p>Oneply Khurkhul Manao Phanek </p> */}
//                       <CategoryOption
//                         // title="Women"
//                         data={
//                           isLoadingWomenCategory ? [] : womenCategory?.data
//                         }
//                       />
//                       {/* </div> */}
//                     </div>

// import React from "react";
// import { Link } from "react-router-dom";
// import rani from "../../assets/images/rani6.jpg";
// import wangkhei from "../../assets/images/wangkhei1.jpg";
// import pheijom from "../../assets/images/pheijom5.jpg";
// import blouse from "../../assets/images/top3.jpg";
// import phanek from "../../assets/images/phanek1.jpg";
// import top from "../../assets/images/top.jpg";
// import muka from "../../assets/images/muka4.jpg";
// import { Carousel } from "@mantine/carousel";
// import { ScrollArea, Box } from "@mantine/core";
// const PriceStores = () => {
//   return (
//     <div className="pt-2">
//       <div className="overflow-hidden rounded-3xl sm:h-[380px] h-[350px]  hero-bg-color ">
//         <h1 className=" flex justify-start items-start text-xl font-semibold hover:text-red-500  text-black dark:text-white pl-5 pt-2 ">
//           Price Stores
//         </h1>

//         <ScrollArea
//           // h={480}
//           // w={800}
//           type="never"
//           // scrollbars="y"
//           // scrollHideDelay={200}
//         >
//           <Box>
//             <div className="flex flex-grow gap-2 p-5">
//               <Link to="/shopByCategory/Wangkhei Phee">
//                 <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
//                   <img
//                     className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
//                     src={wangkhei}
//                     alt=""
//                   />
//                   <div className="w-full flex flex-col justify-center items-center p-2">
//                     <h2 className="text-black sm:text-[18px] text-[15px]">
//                       Wangkhei Phee
//                     </h2>
//                     <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
//                       Around ₹ 10000
//                     </h2>
//                   </div>
//                 </div>
//               </Link>

//               <Link to="/shopByCategory/Digital Print Pheijom">
//                 <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
//                   <img
//                     className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
//                     src={pheijom}
//                     alt=""
//                   />
//                   <div className="w-full flex flex-col justify-center items-center p-2">
//                     <h2 className="text-black sm:text-[18px] text-[15px]">
//                       Kurta Pheijom
//                     </h2>
//                     <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
//                       Around ₹ 20000
//                     </h2>
//                   </div>
//                 </div>
//               </Link>
//               <Link to="/shopByCategory/Blouse">
//                 <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
//                   <img
//                     className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
//                     src={blouse}
//                     alt=""
//                   />
//                   <div className="w-full flex flex-col justify-center items-center p-2">
//                     <h2 className="text-black sm:text-[18px] text-[15px]">
//                       Blouse
//                     </h2>
//                     <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
//                       Around ₹ 2000
//                     </h2>
//                   </div>
//                 </div>
//               </Link>
//               <Link to="/shopByCategory/Rani Phee">
//                 <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
//                   <img
//                     className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
//                     src={rani}
//                     alt=""
//                   />
//                   <div className="w-full flex flex-col justify-center items-center p-2">
//                     <h2 className="text-black sm:text-[18px] text-[15px]">
//                       Rani phee
//                     </h2>
//                     <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
//                       Around ₹ 20000
//                     </h2>
//                   </div>
//                 </div>
//               </Link>
//               <Link to="/shopByCategory/Phanek">
//                 <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
//                   <img
//                     className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
//                     src={phanek}
//                     alt=""
//                   />
//                   <div className="w-full flex flex-col justify-center items-center p-2">
//                     <h2 className="text-black sm:text-[18px] text-[15px]">
//                       Phanek
//                     </h2>
//                     <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
//                       Around ₹ 15000
//                     </h2>
//                   </div>
//                 </div>
//               </Link>
//               <Link to="/shopByCategory/Top">
//                 <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
//                   <img
//                     className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
//                     src={top}
//                     alt=""
//                   />
//                   <div className="w-full flex flex-col justify-center items-center p-2">
//                     <h2 className="text-black sm:text-[18px] text-[15px]">
//                       Top
//                     </h2>
//                     <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
//                       Around ₹ 2000
//                     </h2>
//                   </div>
//                 </div>
//               </Link>
//               <Link to="/shopByCategory/Muka-phee">
//                 <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
//                   <img
//                     className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
//                     src={muka}
//                     alt=""
//                   />
//                   <div className="w-full flex flex-col justify-center items-center p-2">
//                     <h2 className="text-black sm:text-[18px] text-[15px]">
//                       Muka phee
//                     </h2>
//                     <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
//                       Around ₹ 5000
//                     </h2>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </Box>
//         </ScrollArea>
//       </div>
//     </div>
//     // </div>
//   );
// };

// export default PriceStores;
