import { type NextPage } from "next";
import MultipleFileUploadForm from "../components/MultipleFileUploadForm";
import SingleFileUploadForm from "../components/SingleFileUploadForm";
import Layout from '../layouts/default';

// This sample is copy from https://codersteps.com/articles/how-to-build-a-file-uploader-with-next-js-and-formidable

const Upload: NextPage = () => {

    return (
        <Layout>
            <div className="w-full max-w-3xl px-3 mx-auto">
                <h1 className="mb-10 text-3xl font-bold text-gray-200">
                    Upload your files
                </h1>

                <div className="space-y-10">
                    <div>
                        <h2 className="mb-3 text-xl font-bold text-gray-200">
                            Single File Upload Form
                        </h2>
                        <SingleFileUploadForm />
                    </div>
                    <div>
                        <h2 className="mb-3 text-xl font-bold text-gray-200">
                            Multiple File Upload Form
                        </h2>
                        <MultipleFileUploadForm />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Upload;
