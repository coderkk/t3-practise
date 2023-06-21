import { type NextPage } from "next";
import Layout from '../../layouts/default';
import { useAtom } from "jotai/react";
import { nameAtom } from "../../atoms/testAtom"
import Link from "next/link";

const JotaiPage: NextPage = ({}) => {
  const [name] = useAtom(nameAtom)
  return (
    <>
      <Layout>
        Test Jotai: {name}

        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="/jotai/page1" target="_blank"
        >
          Goto Page 1
        </Link>

        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="/jotai/page2" target="_blank"
        >
          Goto Page 2
        </Link>
      </Layout>
    </>
  );
}

export default JotaiPage;