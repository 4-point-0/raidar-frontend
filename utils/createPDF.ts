// pages/api/create-pdf.js
import { PDFDocument } from "pdf-lib";
import { fetchContractControllerCreateContract } from "@/services/api/raidar/raidarComponents";
import { ToWords } from "to-words";

export default async function createPDF(
  songId?: string,
  title?: string,
  pka?: string,
  length?: string,
  price?: string,
  descriptionOfUse?: string,
  userMail?: string,
  signatureDataUrl?: any,
  pdfLink?: string,
  isBought?: boolean
) {
  try {
    const today = new Date();
    const toWords = new ToWords();

    const numericPrice = price ? Number(price) : 0; // Convert price to number, default to 0 if undefined or invalid
    const priceInWords = toWords.convert(numericPrice); // Convert the numeric price to words

    const formUrl =
      isBought && pdfLink
        ? pdfLink
        : "/documentation/RDR-Sync-License-Template.pdf";

    // const formUrl = "/documentation/RDR-Sync-License-Template.pdf";
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formPdfBytes);

    console.log("signatureDataUrl", signatureDataUrl);

    const signatureImageBytes = Buffer.from(
      signatureDataUrl.split(",")[1],
      "base64"
    );

    const authorSignature = await pdfDoc.embedPng(signatureImageBytes);

    const pngDims = authorSignature.scale(0.1);

    const pages = pdfDoc.getPages();
    const thirdPage = pages[2];

    const form = pdfDoc.getForm();

    const fieldNames = [
      "dateCreated",
      "pka",
      "dateBought",
      "buyer",
      "compositionName",
      "writtersPercentageText",
      "writtersPercentageNumber",
      "performedBy",
      "program",
      "titleOfPictureMedia",
      "licensee",
      "usePurpose",
      "program",
      "usePurpose",
      "duration",
      "synopsis",
      "descriptionOfUse",
      "costText",
      "costNumber",
    ];

    fieldNames.forEach((fieldName) => {
      const field = form.getTextField(fieldName);
      field.setFontSize(10);
    });

    if (!isBought) {
      //left page corner in the PDF file reserved for the Artist signature
      thirdPage.drawImage(authorSignature, {
        x: 50,
        y: 50,
        width: pngDims.width,
        height: pngDims.height,
      });

      form
        .getTextField("dateCreated")
        .setText(today.toLocaleDateString("en-us"));
      form.getTextField("pka").setText(pka);
      form.getTextField("compositionName").setText(title);
      form.getTextField("writtersPercentageText").setText("Zero Percentage");
      form.getTextField("writtersPercentageNumber").setText("0");
      // form.getTextField("titleOfPictureMedia").setText("Title");
      form.getTextField("program").setText("n/a");
      form.getTextField("performedBy").setText(pka);
      form.getTextField("duration").setText(length);
      form.getTextField("synopsis").setText("n/a");
      form.getTextField("costText").setText(`${priceInWords} USD`);
      form.getTextField("costNumber").setText(price?.toString());
    } else {
      //right page corner in the PDF file reserved for the Buyer signature
      thirdPage.drawImage(authorSignature, {
        x: thirdPage.getWidth() - pngDims.width - 5, // subtract image width from page width and adjust with a small margin
        y: 50,
        width: pngDims.width,
        height: pngDims.height,
      });

      form
        .getTextField("dateBought")
        .setText(today.toLocaleDateString("en-us"));
      form.getTextField("buyer").setText(userMail);
      form
        .getTextField("licensee")
        .setText(`The holder of a licence ${userMail}`);
      form.getTextField("usePurpose").setText(descriptionOfUse);
      form.getTextField("descriptionOfUse").setText(descriptionOfUse);
    }

    const pdfBytes = await pdfDoc.save();

    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

    const requestBody = {
      songId: songId,
      file: pdfBlob,
    };

    const response = await fetchContractControllerCreateContract({
      body: requestBody as any,
    });

    console.log("response", response);
  } catch (error) {
    console.error("Error details:", error);
  }
}
