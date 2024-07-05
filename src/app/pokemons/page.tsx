"use client";

import { Pokemon } from "@/types/PokemonType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PokemonList = () => {
  const fetchPokemonData = async (): Promise<Pokemon[]> => {
    try {
      const response = await axios.get(`http://localhost:3000/api/pokemons`);
      return response.data;
    } catch (error) {
      console.error("데이터를 가져오지 못했습니다.", error);
    }
    return [];
  };

  const {
    data: pokemonData,
    error,
    isPending,
  } = useQuery<Pokemon[]>({
    queryKey: ["pokemonData"],
    queryFn: () => fetchPokemonData(),
    staleTime: Infinity,
  });

  if (isPending)
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-2xl text-white">
        Loading...
      </div>
    );
  if (error) return <div>Error!! {error.message}</div>;

  return (
    <>
      <ul className="grid gap-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 min-[320px]:grid-cols-2 text-center mb-10">
        {pokemonData?.map((pokemon: Pokemon) => (
          <li
            key={pokemon.id}
            className="rounded-lg bg-[#F4FAED] transition-all duration-300 ease-in-out w-[300px]"
          >
            <p className="text-left bg-[#9BD994] text-[#3E5F61] px-5 py-2 rounded-tl-lg rounded-tr-lg">{`NO. ${pokemon.id}`}</p>
            <div className="p-5">
              <Link href={`/pokemons/${pokemon.id}`}>
                <Image
                  src={pokemon.sprites.front_default}
                  width={150}
                  height={150}
                  alt="unsplash image"
                  className="mx-auto"
                />
                <p className="mb-3 text-[#3E5F61]">
                  {pokemon.korean_name ? pokemon.korean_name : pokemon.name}
                </p>
                <div className="flex flex-col text-left gap-2">
                  <p className="text-sm bg-[#E6EFDE] rounded-tl-[50px] rounded-bl-[50px] text-[#3E5F61]">
                    <span className="w-[70px] text-white mr-2 text-sm bg-gradient-to-r from-[#9BD994] to-[#2DCAA5] rounded-[50px] py-1 px-2 inline-block text-center">
                      키
                    </span>
                    {`${pokemon.height}cm`}
                  </p>
                  <p className="text-sm bg-[#E6EFDE] rounded-tl-[50px] rounded-bl-[50px] text-[#3E5F61]">
                    <span className="w-[70px] text-white text-sm mr-2 bg-gradient-to-r from-[#9BD994] to-[#2DCAA5] rounded-[50px] py-1 px-3 inline-block text-center">
                      몸무게
                    </span>
                    {`${pokemon.weight}kg`}
                  </p>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {/* <button onClick={() => fetchNextPage()}>더 불러오기</button> */}
    </>
  );
};

export default PokemonList;
