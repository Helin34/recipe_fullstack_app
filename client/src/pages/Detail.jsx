import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegClock, FaTrashAlt } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { toast } from "react-toastify";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => api.get(`/api/recipes/${id}`).then((res) => res.data.recipe),
  });
  const deleteMut = useMutation({
    mutationFn: () => api.delete(`/api/recipes/${id}`),
    onSuccess: () => {
      navigate("/");
      toast.success("Tarif Kaldırıldı");
    },
    onError: () => {
      toast.error("Bir şeyler ters gitti");
    },
  });
  return (
    <div className="flex-1 bg-gray-200 p-5 h-screen overflow-auto">
      <div className="flex justify-between">
        <Link
          className="flex items-center gap-4 text-xl hover:bg-gray-300 p-1 rounded-md"
          to={"/"}
        >
          <IoMdArrowRoundBack />
          Geri
        </Link>
        <button
          disabled={isLoading}
          onClick={() => deleteMut.mutate()}
          className="bg-red-500 flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-red-600"
        >
          <FaTrashAlt />
          {isLoading ? "Yükleniyor" : "Sil"}
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="max-w-5xl m-auto mt-10 flex flex-col gap-10">
          <h1 className="text-3xl font-bold">{data.recipeName}</h1>
          <div className="flex gap-4">
            <span className="bg-yellow-500 py-2 px-4 rounded-lg text-white font-semibold">
              {data.category}
            </span>
            <span className="bg-yellow-500 py-2 px-4 rounded-lg text-white font-semibold flex items-center gap-3">
              <FaRegClock />
              {data.recipeTime}
            </span>
          </div>
          <img className="rounded-lg max-h-[400px]" src={data.image} alt="" />
          <div>
            <h1 className="text-2xl text-red-400 font-bold mb-4">Malzemeler</h1>
            <ul className="font-semibold text-lg">
              {data.ingredients.map((i) => (
                <li>{i}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-2xl text-red-400 font-bold mb-4">Tarif</h1>
            <ol className="font-semibold text-lg list-decimal ps-5">
              {data.instructions.map((i) => (
                <li>{i}</li>
              ))}
            </ol>
          </div>
          <div>
            <h1 className="text-2xl text-red-400 font-bold mb-4">
              Sunum Önerisi
            </h1>
            <p>{data.servingSuggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
