import Footer from './footer'
import Head from "next/head";
export interface props {
  children?: React.ReactNode; }


export default function Layout({ children }: props) {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        {children}
      </main>
      <Footer></Footer>
    </>
  )
}