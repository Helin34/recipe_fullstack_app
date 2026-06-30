import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import { useDebounce } from "@uidotdev/usehooks";
const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState(null);
  const debouncedTerm = useDebounce(searchTerm, 300);
  const params = {
    search: debouncedTerm,
    order,
  };
  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipes", debouncedTerm, order],
    queryFn: async () => {
      const res = await api.get("/api/recipes", { params });
      console.log("Backend'den gelen ham yanıt:", res); // Buraya bakın
      return res.data;
    },
  });
  console.log(data);

  return (
    <main className="flex-1 bg-gray-200 p-4 overflow-auto ">
      <section>
        <div className="bg-white flex gap-3 p-2 rounded-lg overflow-hidden items-center shadow-lg">
          <CiSearch className="text-xl" />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
            type="text"
          />
        </div>
      </section>
      <section>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error />
        ) : (
          <>
            <div className="flex justify-between items-center ">
              <h1 className="text-3xl my-5">{data?.results} Tarif Bulundu</h1>
              <select
                onChange={(e) => setOrder(e.target.value)}
                className="rounded-md p-2"
              >
                <option selected disabled>
                  Süreye Göre
                </option>
                <option value="asc">Artan</option>
                <option value="desc">Azalan</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data?.recipes?.map((recipe) => (
                <div key={recipe.id} className="bg-white p-4 rounded-lg shadow">
                  <Card recipe={recipe} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Main;
