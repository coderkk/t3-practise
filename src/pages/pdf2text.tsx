import { type NextPage } from "next";
import axios from 'axios';
import { useState } from "react";
import Layout from '../layouts/default';

const Image2Text: NextPage = () => {
    const [jsonData, setJsonData] = useState(null);
  
    async function handleImageChange(e : React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        if (e.target.files === null) return;

        const form = document.querySelector("form");
        if (form) {
            const formData = new FormData(form);
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                await axios({
                    method: "post",
                    url: "http://pdf2text.coderkk.net/invoicePdf2/",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                }).then((res: () => void) => {
                    setJsonData(res.data)
                });
            } catch(error) {
                console.log(error)
            }
            }
    }
    return (
      <>
      <Layout>
        <div className="grid grid-cols-2 gap-4">
          <form id="form">
            <p>Choose an Image</p>
            <input
              title="Choose an PDF"
              placeholder="Please select a file"
              type="file"
              name="file"
              id="file"
              onChange={handleImageChange}
              accept="application/pdf, application/x-pdf,application/acrobat, applications/vnd.pdf, text/pdf, text/x-pdf"
            />
          </form>
          <div className="display-flex">
            <p>{jsonData}</p>
          </div>
        </div>
      </Layout>
      </>
    );
}

export default Image2Text;