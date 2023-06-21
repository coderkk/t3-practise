import { type NextPage } from "next";
import Layout from '../../layouts/default';
import { useAtom } from "jotai/react";
import { nameAtom } from "../../atoms/testAtom"
import { useEffect } from 'react';
import Link from "next/link";

const Page1: NextPage = ({}) => {
  const [name, setName] = useAtom(nameAtom);
  
  useEffect(() => {
    setName("Page1");
  });
  return (
    <>
      <Layout>
        Current Jotai: {name}

        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="/jotai"
        >
          Back
        </Link>
      </Layout>
    </>
  );
}

export default Page1;