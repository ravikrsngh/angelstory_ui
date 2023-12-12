/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fabric } from "fabric";
import { useContext } from "react";
import { CanvasContext } from "../../context/canvasContext";
import WebFont from "webfontloader";
import { CanvasContextType, TextPhrase } from "../../types";
import { useGetTextPhrases } from "../../hooks/textphrases/use-get-textphrases";

export default function TextPanel() {
  const { fabricRef, recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );

  const { data, isLoading, isFetching } = useGetTextPhrases();

  const addHeading = (size: number) => {
    const text = new fabric.IText("Enter your text here", {
      left: 100,
      top: 100,
      //@ts-ignore
      fontSize: parseInt(size / fabricRef.current.getZoom()),
      fill: "black",
    });
    //@ts-ignore
    fabricRef.current.add(text);
    recordChange();
  };

  const importTextFromJSON = (jsonData: string) => {
    // const jsonData =
    //   '{"type":"group","version":"5.3.0","originX":"center","originY":"center","left":400.69,"top":285.36,"width":560.21,"height":361.56,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"objects":[{"type":"i-text","version":"5.3.0","originX":"left","originY":"top","left":-254.93,"top":-180.78,"width":534.04,"height":266.05,"fill":"#1167bd","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Akatab","fontWeight":"bold","fontSize":109,"text":"Enter your \ntext here","underline":false,"overline":false,"linethrough":false,"textAlign":"center","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline"},{"type":"i-text","version":"5.3.0","originX":"left","originY":"top","left":-280.1,"top":102.94,"width":541.88,"height":76.84,"fill":"black","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Times New Roman","fontWeight":"normal","fontSize":68,"text":"Enter your text here","underline":false,"overline":false,"linethrough":false,"textAlign":"left","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline"}]}';
    //
    jsonData.replace("\n", "n-n-n");
    const json = JSON.parse(JSON.parse(jsonData));
    console.log(json);
    const fontFamilies = [];
    for (let i = 0; i < json.objects.length; i++) {
      fontFamilies.push(json.objects[i]["fontFamily"]);
      const txt = json.objects[i].text.replace("n-n-n", "\n");
      delete json.objects[i]["text"];
      fabricRef.current?.add(
        new fabric.IText(txt, {
          ...json.objects[i],
          left: json["left"] + json.objects[i]["left"],
          top: json["top"] + json.objects[i]["top"],
        })
      );
    }
    console.log(fontFamilies);
    WebFont.load({
      google: {
        families: fontFamilies,
      },
      active: () => {
        recordChange();
      },
    });
  };

  if (isLoading || isFetching) {
    return <span>Loading ...</span>;
  }

  return (
    <div className="p-5">
      <h4 className="hidden lg:block text-base text-primary-700 font-medium">
        Text
      </h4>
      <div className="flex gap-4 mt-4 flex-col">
        <button
          onClick={() => addHeading(48)}
          className="text-slate-800 hover:text-white hover:bg-primary-400 bg-slate-200 w-full py-3 text-2xl"
        >
          Add Heading 1
        </button>
        <button
          onClick={() => addHeading(30)}
          className="text-slate-800 hover:text-white hover:bg-primary-400 bg-slate-200 w-full py-3 text-xl"
        >
          Add Sub Heading
        </button>
        <button
          onClick={() => addHeading(18)}
          className="text-slate-800 hover:text-white hover:bg-primary-400 bg-slate-200 w-full py-3 text-sm"
        >
          Add Paragraph
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {data?.map((ins: TextPhrase) => (
          <div
            key={ins.id}
            className="flex justify-center items-center border border-slate-200 rounded-sm min-h-[100px]"
            onClick={() => importTextFromJSON(ins.formattedData)}
          >
            <img src={ins.previewImg} />
          </div>
        ))}
      </div>
    </div>
  );
}
