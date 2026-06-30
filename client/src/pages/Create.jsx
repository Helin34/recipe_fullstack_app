import React from "react";
import Select from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../utils/api";
import { toast } from "react-toastify";
const Layout = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold" htmlFor="">
        {label}
      </label>
      {children}
    </div>
  );
};

const Create = () => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: (newRecipe) => api.post("/api/recipes", newRecipe),
    onSuccess: () => {
      toast.success("Yeni Tarif oluşturuldu");
      navigate("/");
    },
    onError: () => {
      toast.error("tarif oluşturulamadı");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());
    newRecipe = {
      ...newRecipe,
      ingredients,
      instructions,
      image: `https://picsum.photos/5${Math.round(Math.random() * 89 + 10)}`,
    };
    console.log(newRecipe);
    mutate(newRecipe);
  };
  console.log(ingredients);
  return (
    <div className="flex-1 bg-gray-200 p-4 h-screen overflow-auto">
      <form
        onSubmit={handleSubmit}
        action=""
        className="max-w-2xl m-auto my-20 flex flex-col gap-10"
      >
        <h1 className="text-3xl font-bold text-red-400">Yeni Tarif Oluştur</h1>
        <Layout label="Tarif Başlığı">
          <input
            type="text"
            className="bg-white rounded-md p-2 focus:outline-red-400"
            name="recipeName"
            required
          />
        </Layout>
        <Layout label="Tarif Kategorisi">
          <input
            type="text"
            className="bg-white rounded-md p-2 focus:outline-red-400"
            name="category"
            required
          />
        </Layout>
        <Layout label="Tarif Süresi">
          <input
            type="number"
            className="bg-white rounded-md p-2 focus:outline-red-400"
            name="recipeTime"
            required
            min={3}
            max={500}
          />
        </Layout>
        <Layout label="Malzemeler">
          <Select
            onChange={(options) =>
              setIngredients(options.map((opt) => opt.value))
            }
            isMulti
            required
          />
        </Layout>
        <Layout label="Tarif Adımları (sırasına dikkat edin)">
          <Select
            onChange={(options) =>
              setInstructions(options.map((opt) => opt.value))
            }
            isMulti
            required
          />
        </Layout>
        <Layout label="Sunum Önerisi">
          <textarea
            className="rounded-md p-2 focus:outline-red-400 bg-white"
            name="servingSuggestion"
            required
          />
        </Layout>
        <div className="flex justify-end gap-6">
          <Link
            to={"/"}
            className="bg-gray-400 py-2 px-4 rounded-md text-white font-semibold text-lg hover:bg-gray-500"
          >
            İptal
          </Link>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-red-400 py-2 px-4 rounded-md text-white font-semibold text-lg hover:bg-red-500"
          >
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
