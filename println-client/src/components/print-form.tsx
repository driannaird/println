import { useRef, useState } from "react";
import { useIpContext } from "../context/ip";

const PrintForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<string>("");
  const { name } = useIpContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadResult("Please select a valid file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow" as RequestRedirect,
    };

    try {
      const response = await fetch(`http://${name}:6736/print`, requestOptions);
      const result = await response.text();
      setUploadResult(result);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      setUploadResult("An error occurred while uploading the file.");
    }
  };

  const validFileTypes = ["application/pdf"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file && validFileTypes.includes(file.type)) {
      setSelectedFile(file);
      setUploadResult("");
    } else {
      setSelectedFile(null);
      setUploadResult("Invalid file type. Please select a PDF");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col w-64 mt-4">
        <label htmlFor="fileInput" className="mb-1 text-sm text-secondary">
          Upload a file (PDF):
        </label>
        <input
          type="file"
          ref={fileInputRef}
          disabled={name === null}
          id="fileInput"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-2 border-2 rounded-lg bg-accent/10 border-accent"
        />
        <button
          type="submit"
          disabled={!selectedFile}
          className="py-2 mt-2 font-semibold text-white transition duration-300 ease-in-out rounded-md bg-accent hover:bg-accent/50 disabled:bg-gray-300 disabled:cursor-not-allowed">
          Print
        </button>
      </form>
      {uploadResult && (
        <p
          className={`text-sm mt-2 ${
            uploadResult.includes("Invalid") || uploadResult.includes("error")
              ? "text-red-500"
              : "text-green-500"
          }`}>
          {uploadResult}
        </p>
      )}
    </>
  );
};

export default PrintForm;
