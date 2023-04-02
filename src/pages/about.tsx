import { type NextPage } from "next";
import Layout from '../layouts/default';

const About: NextPage = () => {

    return (
        <>
            <Layout>
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                        <span className="text-[hsl(280,100%,70%)]">About</span>
                    </h1>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
                        This is about page
                    </div>
                </div>
            </Layout>
        </>
    );
    };

export default About;
