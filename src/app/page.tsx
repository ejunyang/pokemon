import Link from "next/link";

export default function Home() {
  return (
    <>
      <ul className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center ">
        <li className=" text-[rgba(255,255,255,.5)] text-[30px] transition-all duration-300 ease-in-out hover:text-white">
          <Link href="/" className="block px-[100px] py-5">
            홈으로
          </Link>
        </li>
        <li className="my-5 text-[rgba(255,255,255,.5)] text-[30px] transition-all duration-300 ease-in-out hover:text-white">
          <Link href="/pokemons" className="block px-[100px] py-0">
            포켓몬 도감
          </Link>
        </li>
        <li className="text-[rgba(255,255,255,.5)] text-[30px] transition-all duration-300 ease-in-out hover:text-white hover:bg-">
          <Link
            href="https://github.com/ejunyang"
            className="block px-[100px] py-5"
          >
            깃허브
          </Link>
        </li>
      </ul>
      <p className="absolute bottom-10 text-white">
        Copyright 2024. ejunyang. all rights reserved.
      </p>
    </>
  );
}
