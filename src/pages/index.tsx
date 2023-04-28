import { type NextPage } from "next";
import Link from "next/link";
import Layout from '../layouts/default';

import { api } from "../utils/api";

const Home: NextPage = ({}) => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Layout>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/upload"
            >
              <h3 className="text-2xl font-bold">File upload →</h3>
              <div className="text-lg">
                This is simple file upload module to serer.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/image2text"
            >
              <h3 className="text-2xl font-bold">Image to Text →</h3>
              <div className="text-lg">
                You can upload a image, then server will extract the text.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/pdf2text"
            >
              <h3 className="text-2xl font-bold">Pdf to Text →</h3>
              <div className="text-lg">
                Extract the pdf to text and using https://pdf2text.coderkk.net
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/chart"
            >
              <h3 className="text-2xl font-bold">Chart →</h3>
              <div className="text-lg">
                Chart example
              </div>
            </Link>
          </div>
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Home;
