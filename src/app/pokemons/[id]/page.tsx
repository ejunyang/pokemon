import { Pokemon, Props } from "@/types/PokemonType";
import axios from "axios";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const { data: pokemon } = await axios.get<Pokemon>(
    `http://localhost:3000/api/pokemons/${id}`
  );
  return {
    title: `No.${pokemon.id} ${pokemon.korean_name}`,
    description: `${pokemon.korean_name}의 상세페이지 입니다.`,
  };
}

const DetailPokemonPage = async ({ params }: Props) => {
  const { id } = params;
  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/pokemons/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("데이터를 가져오지 못했습니다.", error);
      return [];
    }
  };

  const pokemonData: Pokemon = await fetchPokemonData();

  return (
    <>
      <div className="bg-[#F4FAED] w-[1240px] p-5 rounded-lg relative mb-10">
        <Link
          href="/pokemons"
          className="bg-[#E6EFDE] px-5 py-1 w-[100px] text-center rounded-[50px] text-[#3E5F61] transition-all duration-300 ease-in-out hover:bg-[#9CD0BA] hover:cursor-pointer"
        >
          BACK
        </Link>

        <div className="flex items-center gap-2 w-[95%]">
          <Image
            src={pokemonData.sprites.front_default}
            width={300}
            height={300}
            alt="포켓몬 이미지"
          />
          <div className="flex flex-col gap-3 flex-auto">
            <h1 className="text-[30px] text-[#3E5F61] flex items-center gap-5">
              <span className="text-[20px] inline-block">{`NO. ${pokemonData.id}`}</span>
              <p>{`${pokemonData.korean_name}`}</p>
            </h1>
            <p className="text-md bg-[#E6EFDE] rounded-tl-[50px] rounded-bl-[50px] text-[#3E5F61]">
              <span className="w-[70px] text-white text-sm mr-2 bg-gradient-to-r from-[#9BD994] to-[#2DCAA5] rounded-[50px] py-1 px-2 inline-block text-center">
                키
              </span>
              {`${pokemonData.height}cm`}
            </p>
            <p className="text-md bg-[#E6EFDE] rounded-tl-[50px] rounded-bl-[50px] text-[#3E5F61]">
              <span className="w-[70px] text-white text-sm mr-2 bg-gradient-to-r from-[#9BD994] to-[#2DCAA5] rounded-[50px] py-1 px-2 inline-block text-center">
                몸무게
              </span>
              {`${pokemonData.weight}kg`}
            </p>
            <p className="text-md bg-[#E6EFDE] rounded-tl-[50px] rounded-bl-[50px] text-[#3E5F61]">
              <span className="w-[70px] text-white text-sm mr-2 bg-gradient-to-r from-[#9BD994] to-[#2DCAA5] rounded-[50px] py-1 px-2 inline-block text-center">
                타입
              </span>
              {pokemonData.types
                .map((type) => type.type.korean_name)
                .join(", ")}
            </p>
            <p className="text-md bg-[#E6EFDE] rounded-tl-[50px] rounded-bl-[50px] text-[#3E5F61]">
              <span className="w-[70px] text-white text-sm mr-2 bg-gradient-to-r from-[#9BD994] to-[#2DCAA5] rounded-[50px] py-1 px-2 inline-block text-center">
                특성
              </span>
              {pokemonData.abilities
                .map((ability) => ability.ability.korean_name)
                .join(" ")}
            </p>
          </div>
        </div>

        <p className="w-[90%] mx-auto mb-10 text-[#666]">
          <span className="w-[70px] break-keep mx-auto mb-3 text-white text-sm bg-gradient-to-r from-[#9BD994] to-[#2DCAA5] rounded-[50px] py-1 px-2 block text-center">
            기술
          </span>
          {pokemonData.moves.map((move) => move.move.korean_name).join(", ")}
        </p>
        <img
          src="/pokeball.png"
          alt="포켓볼"
          className="absolute top-[-10%] w-[7%] right-5"
        />
      </div>
    </>
  );
};

export default DetailPokemonPage;
