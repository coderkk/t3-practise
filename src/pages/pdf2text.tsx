import { type NextPage } from "next";
import axios from 'axios';
import type { AxiosResponse } from "axios";
import { useState } from "react";
import Layout from '../layouts/default';

const Image2Text: NextPage = ({}) => {
    const [jsonData, setJsonData] = useState<JSON | null>(null);

    async function handleImageChange(e : React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        if (e.target.files === null) return;

        const form = document.querySelector("form");
        if (form) {
            const formData = new FormData(form);
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                const res: AxiosResponse<JSON, null> = await axios.post("https://pdf2text.coderkk.net/invoice/",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } },
                );
                setJsonData(res.data)
            } catch(error) {
                console.log(error)
            }
            }
    }
    return (
      <>
      <Layout>
        <div className="grid grid-cols-2 gap-4 text-center">
          <form id="form" className="m-5">
            <p>Choose an Image</p>
            <input
              title="Choose an PDF"
              placeholder="Please select a file"
              type="file"
              name="invoice"
              id="invoice"
              onChange={handleImageChange}
              accept="application/pdf, application/x-pdf,application/acrobat, applications/vnd.pdf, text/pdf, text/x-pdf"
            />
          </form>
          <div className="display-flex m-5">
            <p>{JSON.stringify(jsonData)}</p>
          </div>
        </div>
      </Layout>
      </>
    );
}

export default Image2Text;