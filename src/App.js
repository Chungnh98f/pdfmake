import "./styles.css";
import pdfMake from "pdfmake/build/pdfmake";
import vfs from "../fonts/vfs_fonts";
import { useEffect, useRef, useState } from "react";
pdfMake.vfs = vfs;

pdfMake.fonts = {
  NimbusSans: {
    normal: "NimbusSanL-Reg.otf",
    bold: "NimbusSanL-Bol.otf",
    italics: "NimbusSanL-RegIta.otf",
    bolditalics: "NimbusSanL-BolIta.otf"
  }
};

const docDefinition = {
  content: [
    "First paragraph",
    "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"
  ],
  defaultStyle: {
    font: "NimbusSans"
  }
};

export default function App() {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (url !== null) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  const create = () => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setUrl(url);
    });
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic!</h2>
      <button onClick={create}>Create</button>
      <div>{url}</div>
      {url && (
        <div>
          <object
            style={{
              width: "100%",
              height: "50vh"
            }}
            data={url}
            type="application/pdf"
          >
            <embed src={url} type="application/pdf" />
          </object>
        </div>
      )}
    </div>
  );
}

// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
