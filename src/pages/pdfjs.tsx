import { type NextPage } from "next";
import { useState } from "react";
import Layout from '../layouts/default';
import * as PDFJS from 'pdfjs-dist'


type TokenText = {
    str: string;
};

type PageText = {
    items: TokenText[];
};

type PdfPage = {
    getTextContent: () => Promise<PageText>;
};

type Pdf = {
    numPages: number;
    getPage: (pageNo: number) => Promise<PdfPage>;
};

type PDFSource = Buffer | string;

// PDFJS.disableWorker = true; // due to CORS
PDFJS.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js'

const PdfJS: NextPage = () => {
    const [pdfContent, setPdfContent] = useState('');

    const getPageText = async (pdf: Pdf, pageNo: number) => {
        const page = await pdf.getPage(pageNo);
        const tokenizedText = await page.getTextContent();
        console.log(tokenizedText);
        const pageText = tokenizedText.items.map(token => token.str + ((token.hasEOL) ? "\n" : "")).join("");
        return pageText;
    };
      
    const getPDFText = async (source: PDFSource): Promise<string> => {
        console.log("source", source)
        const pdf: Pdf = await PDFJS.getDocument(source).promise;
        const maxPages = pdf.numPages;
        const pageTextPromises = [];
        for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
          pageTextPromises.push(getPageText(pdf, pageNo));
        }
        const pageTexts = await Promise.all(pageTextPromises);
        return pageTexts.join("\n");
      };
  
    async function handleOpenPDFChange(e : React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        if (e.target.value === "") return;

        try {
            console.log(e);
            await getPDFText(e.target.value).then(function(content) {
                console.log('content', content)
                setPdfContent(content)
            });
        } catch(error) {
            console.error(error)
        }
    }
    return (
      <>
      <Layout>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="m-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a PDF</label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="invoice"
              id="invoice"
              onChange={handleOpenPDFChange}
            >
                <option value=""></option>
                <option value="/uploads/invoice.pdf">Invoice</option>
            </select>
          </div>
          <div className="display-flex m-5">
            <p>{pdfContent}</p>
          </div>
        </div>
      </Layout>
      </>
    );
}

export default PdfJS;