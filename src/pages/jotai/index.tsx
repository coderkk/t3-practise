import { type NextPage } from "next";
import Layout from '../../layouts/default';
import { atom } from 'jotai';
import { useAtom } from "jotai/react";
import { nameAtom } from "../../atoms/testAtom"
import Link from "next/link";

const JotaiPage: NextPage = ({}) => {
  const [name] = useAtom(nameAtom)
  return (
    <>
      <Layout>
        <h3 className="text-2xl font-bold">Home</h3>

        <div className="mb-5">
          Current Jotai: {name}
        </div>

        <div className="flex gap-5">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/jotai/page1"
          >
            Goto Page 1
          </Link>

          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/jotai/page2"
          >
            Goto Page 2
          </Link>
        </div>
      </Layout>
    </>
  );
}

export default JotaiPage;