import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
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
    return <div>No products found for this category</div>;

  return (
    <div>
      Product List
      {productList?.data?.products?.map((product) => (
        <>
          <div>{product?.name}</div>
        </>
      ))}
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
