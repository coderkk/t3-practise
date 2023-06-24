import { type NextPage } from "next";
import Layout from '../../layouts/default';
import { useAtom } from "jotai/react";
import { nameAtom } from "../../atoms/testAtom"
import Link from "next/link";
import { atom } from 'jotai';

const localPage1Atom = atom("default");

const Page1: NextPage = ({}) => {
  const [name, setName] = useAtom(nameAtom);
  const [localPage1, setLocalPage1] = useAtom(localPage1Atom)
  
  // setName("Page1");
  return (
    <>
      <Layout>
        <h3 className="text-2xl font-bold">Paga 1</h3>
        <div className="flex gap-5 mb-5">
          <div className="mb-5">
            Current Jotai: {name}
          </div>

          <div className="mb-5">
            Current Jotai: {localPage1}
          </div>


          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); setName('paga1') }} 
            className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600">
            Change value
          </button>
        </div>

        <div className="flex gap-5">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/jotai/page2"
          >
            Goto Page 2
          </Link>

          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/jotai"
          >
            Back
          </Link>
        </div>
      </Layout>
    </>
  );
}

export default Page1;