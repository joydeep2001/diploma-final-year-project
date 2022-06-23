import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import {
  AiFillDatabase,
  AiOutlineSearch,
  AiOutlineRead,
  AiFillCalculator,
  AiOutlineDeploymentUnit,
  AiTwotoneSound,
  AiOutlineMenu,
} from "react-icons/ai";

import MenuBar from "../components/MenuBar";
async function fetchData() {
  const result = await fetch("http://localhost:3000/menu.yaml");
  const data = await result.json();
  console.log(data);
}
const Home: NextPage = () => {
  //fetchData();
  let { loginStatus, serverURL } = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      <Head>
        <title> Dashboard </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="flex relative">
        <MenuBar className="hidden sm:flex" />
      </body>
    </>
  );
};

export default Home;
