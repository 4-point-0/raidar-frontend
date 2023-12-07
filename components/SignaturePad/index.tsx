import { Button } from "@mantine/core";
import React from "react";
import SignaturePad from "react-signature-pad-wrapper";

export interface SignatureCanvasMethods {
  getSignatureImage: () => string | null;
}

class SignatureCanvas extends React.Component<{}, {}> {
  private signaturePadRef: React.RefObject<SignaturePad>;

  constructor(props: any) {
    super(props);
    this.signaturePadRef = React.createRef();
  }

  getCanvasInstance = () => {
    return this; // Returns the instance of SignatureCanvas
  };

  // Download image method
  // downloadImage = (dataURL: string, filename: string) => {
  //   const a = document.createElement("a");
  //   a.href = dataURL;
  //   a.download = filename;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // };

  // Save image to root method
  // saveImage = () => {
  //   if (
  //     this.signaturePadRef.current &&
  //     !this.signaturePadRef.current.isEmpty()
  //   ) {
  //     const dataURL = this.signaturePadRef.current.toDataURL("image/png");
  //     this.downloadImage(dataURL, "signature.png");
  //   } else {
  //     alert("Please provide a signature first.");
  //   }
  // };

  //Receive the temporary signature image
  getSignatureImage = () => {
    if (
      this.signaturePadRef.current &&
      !this.signaturePadRef.current.isEmpty()
    ) {
      return this.signaturePadRef.current.toDataURL("image/png");
    } else {
      // alert("Please provide a signature first.");
      return null;
    }
  };

  clearCanvas = () => {
    if (this.signaturePadRef.current) {
      this.signaturePadRef.current.clear();
    }
  };

  render() {
    return (
      <div>
        <div
          style={{
            borderRadius: "1px",
            border: "1px solid #ccc",
            marginTop: "3px",
          }}
        >
          <SignaturePad
            ref={this.signaturePadRef}
            options={{
              backgroundColor: "white",
              penColor: "black",
            }}
          />
        </div>
        {/* <Button onClick={this.saveImage}>Save as PNG</Button> */}
        <Button color="red" onClick={this.clearCanvas} mt="md">
          Clear Signature
        </Button>
      </div>
    );
  }
}

export default SignatureCanvas;
