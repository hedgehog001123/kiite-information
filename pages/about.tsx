import Link from "next/link";
import Layout from "../components/Layout";

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>わくわくサイト About</h1>
    <p>わくわくサイトでは、リアルタイムのKiite CafeやKiite Worldの情報をお知らせします。</p>
    <p>
      <Link href="/">ホームに戻る</Link>
    </p>
  </Layout>
);

export default AboutPage;
