import Link from "next/link";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import CafeInformation from "../components/CafeInformation/CafeInformation";
import WorldInformation from "../components/WorldInformation/WorldInformation";

const IndexPage = () => {
  return (
    <Layout title="わくわくサイト">
      <h1>わくわくサイト 👋</h1>
      <CafeInformation />
      <WorldInformation />
      <p>
        <Link href="/about">Aboutページへ</Link>
      </p>
    </Layout>
  )};

export default IndexPage;
