import { type NextPage } from "next";
import type { PDFDocumentProxy } from "pdfjs-dist";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist";
import Layout from '../layouts/default';

import type {
  DocumentInitParameters,
  TextItem,
  TextMarkedContent,
  TypedArray,
} from "pdfjs-dist/types/src/display/api";
import { useState } from "react";

GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

const PdfJS: NextPage = (props) => {
  const [pdfContent, setPdfContent] = useState("");

  const getPageText = async (pdf: PDFDocumentProxy, pageNumber: number) => {
    const page = await pdf.getPage(pageNumber);
    const pageText = await page.getTextContent();
    return pageText.items
      .filter((token: TextItem | TextMarkedContent) => {
        return "hasEOL" in token;
      })
      .map((token: TextItem | TextMarkedContent) => {
        if ("hasEOL" in token) {
          return token.str.toLowerCase() + (token.hasEOL ? "\n" : "");
        }
      })
      .join("");
  };

  const getPDFText = async (
    source: string | URL | TypedArray | ArrayBuffer | DocumentInitParameters
  ): Promise<string> => {
    const loadingTask = pdfjsLib.getDocument(source);
    const pdf = await loadingTask.promise;
    const pageTextPromises = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      pageTextPromises.push(getPageText(pdf, pageNumber));
    }
    const pageTexts = await Promise.all(pageTextPromises);

    for (const pageText of pageTexts) {
      const pageTextLines = pageText.split(/\r?\n/);
      pageTextLines.forEach((pageTextLine) => {
        if (pageTextLine.includes("invoice number")) {
          console.log(pageTextLine.match(/\d/g)?.join(""));
        }
        if (pageTextLine.includes("invoice date")) {
          if (pageTextLine.match(/\d{2}\/\d{2}\/\d{4}/))
            console.log(pageTextLine.match(/\d{2}\/\d{2}\/\d{4}/)?.join(""));
          if (pageTextLine.match(/\d{2}-\d{2}-\d{4}/))
            console.log(pageTextLine.match(/\d{2}-\d{2}-\d{4}/)?.join(""));
        }
        if (
          pageTextLine.includes("total") &&
          pageTextLine.split(" ").includes("total")
        ) {
          if (pageTextLine.match(/\d/g))
            console.log(pageTextLine.match(/\d+(?:\.\d{2})?/)?.join(""));
        }
      });
    }
    return pageTexts.join("\n");
  };

  async function handleOpenPDFChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    if (e.target.value === "") return;

    try {
      const content = await getPDFText(e.target.value);
      setPdfContent(content);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
        <Layout>
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="m-5">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Select a PDF
                </label>
                <select
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    name="invoice"
                    id="invoice"
                    title="invoice"
                    onChange={(e) => {
                    void handleOpenPDFChange(e);
                    }}
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
};

export default PdfJS;