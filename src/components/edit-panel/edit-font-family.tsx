import React, { useContext, useEffect, useState } from "react";
import { CanvasContext } from "../../context/canvasContext";
import { CanvasContextType, GoogleFontResponseType } from "../../types";
import WebFont from 'webfontloader';

export default function EditFontFamily({object} : {object: fabric.Text | undefined}) {
  const { recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const [fontList, setFontList] = useState<GoogleFontResponseType[]>([]);
  const [fontFamily, setFontFamily] = useState(
    object?.fontFamily
  );
  
  const updateFontFamily = () => {
    WebFont.load({
      google: {
        families: [fontFamily || ''],
      },
      active: () => {
        object?.set({
          fontFamily: fontFamily
        });
        recordChange();
      }
    })
  
    
  };

  useEffect(() => {
    updateFontFamily();
  }, [fontFamily]);

  useEffect(() => {
    // Fetch the list of Google Fonts using the Google Fonts API
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBkKgCbOnB4ttZA3K2AyZSzR3_N29YO71g')
      .then(response => response.json())
      .then(data => {
        setFontList(data.items);
      })
      .catch(error => console.error('Error fetching fonts:', error));
  }, []);

  return (
    <div className="">
      <h3 className="font-medium text-lg text-primary-700 mb-4 flex justify-between">Font Family</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap">
          <select
            className="w- border border-slate-200 px-2 py-1 max-w-full w-full"
            name="fontFamily"
            id="fontFamily"
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value={fontFamily} disabled selected>
              {fontFamily}
            </option>
            {fontList.map((font) => (
              <option key={font.version} value={font.family}>{font.family}</option>
            ))}

            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
      </div>
    </div>
  );
}
