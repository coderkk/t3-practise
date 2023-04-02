import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createWorker } from "tesseract.js";
import Layout from '../layouts/default';

const Image2Text: NextPage = () => {
    const [ocr, setOcr] = useState("");
    const [imageData, setImageData] = useState<string>("");
    // const worker = createWorker({
    //   logger: (m) => {
    //     console.log(m);
    //   },
    // });
  
    useEffect(() => {
      const convertImageToText = async () => {
        if (!imageData) return;
        const worker = await createWorker({
          logger: (m) => {
            console.log(m);
          },
        });
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");
        const {
          data: { text },
        } = await worker.recognize(imageData);
        setOcr(text);
      };

      async function fetchData() {
        await convertImageToText();
      }
      fetchData()
        .catch(console.log);
    }, [imageData]);
  
    function handleImageChange(e : React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files === null) return;
      const file = e.target.files[0];
      if(!file)return;
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUri = reader.result as string;
        console.log({ imageDataUri });
        setImageData(imageDataUri);
      };
      reader.readAsDataURL(file); 
    }
    return (
      <>
      <Layout>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Choose an Image</p>
            <input
              title="Choose an Image"
              placeholder="Please select a file"
              type="file"
              name=""
              id=""
              onChange={handleImageChange}
              accept="image/*"
            />
            <Image src={imageData} alt="" width={376} height={190} />
          </div>
          <div className="display-flex">
            <p>{ocr}</p>
          </div>
        </div>
      </Layout>
      </>
    );
}

export default Image2Text;