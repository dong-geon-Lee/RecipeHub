"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { xml2js } from "xml-js";

const Home = () => {
  const [recipeData, setRecipeData] = useState<any>([]);
  const [page, setPage] = useState<Number>(1);
  const [pageSize, setPageSize] = useState<Number>(18);
  const [foodName, setFoodName] = useState<String>("밥");
  const [ckayName, setCkayName] = useState<String>("조리");

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = "serviceKey=" + process.env.NEXT_PUBLIC_API_KEY;
  const dataType = "service_Type=" + process.env.NEXT_PUBLIC_TYPE;
  const API_URL = `${baseUrl}?${apiKey}&${dataType}&Page_No=${page}&Page_Size=${pageSize}&food_Name=${foodName}&ckry_Name=${ckayName}`;

  useEffect(() => {
    const fetchData = async () => {
      const responseXML = await axios.get(API_URL);
      const results: any = xml2js(responseXML.data, { compact: true });
      setRecipeData(results.response?.body);
    };
    fetchData();
  }, []);

  console.log(recipeData);
  console.log(recipeData?.items?.item);

  return (
    <div>
      {recipeData.items?.item.map((x: any) => (
        <div key={x.no._text}>
          <h1>{x.no._text}</h1>
          <h1>{x.fd_Nm._text}</h1>
          <h1>{x.fd_Grupp_Nm._text}</h1>
          <h1>{x.ckry_Nm._text}</h1>
          <h3>{x.ckry_Sumry_Info._text}</h3>
          <h3>재료 수: {x.food_Cnt._text}</h3>
          <h3>식품 중량: {x.fd_Wgh._text}g</h3>
          <h3>
            {x.food_List.food.map((y: any, index: number) => (
              <div key={y.food_Code._text + index}>
                {/* <Image
                  src={y?.food_Image_Address?._text}
                  alt="food_image"
                  width={100}
                  height={100}
                  priority={true}
                  className="rounded-full"
                /> */}
                <div>식품명: {y.food_Nm._text}</div>
                <div>
                  재료 중량: {y.food_Wgh._text}g (출저: {y.origin_Code_Nm._text}
                  )
                </div>
              </div>
            ))}
          </h3>
          <p>------------------------------------------------------------</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
