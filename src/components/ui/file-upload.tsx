"use client";
import { Upload } from "lucide-react";
import { useRef } from "react";

interface fileUpType {
  file: string;
  setFile: (value: string) => void;
  dataChecked: boolean;
}

export default function FileUpload({ file, setFile, dataChecked }: fileUpType) {
  const ImageRef = useRef<HTMLInputElement>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-2">
      <label htmlFor="productImg" className="w-full h-full">
        <div className="w-full h-full border-dashed border-2 rounded-lg flex flex-col justify-around cursor-pointer hover:bg-zinc-500 dark:hover:bg-zinc-800">
          <div className="flex justify-center">
            <Upload size={24} />
          </div>
          {file == "" ? (
            <>
              <div className="font-semibold flex justify-center text-center text-sm">
                Click to upload
              </div>
              <div className="text-sm text-center text-zinc-700 dark:text-zinc-500">
                SVG, PNG, JPG or GIF (Max. 5MB)
              </div>
            </>
          ) : (
            <div className="text-sm text-center text-zinc-800 dark:text-zinc-400">
              {file}
            </div>
          )}
          <input
            type="file"
            name="imageUpload"
            id="productImg"
            className="hidden"
            value={file}
            ref={ImageRef}
            disabled={dataChecked}
            onChange={() => {
              if (ImageRef.current) {
                setFile(ImageRef.current.value);
              }
            }}
          />
        </div>
      </label>
    </div>
  );
}
