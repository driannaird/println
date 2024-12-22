import React, { useState } from "react";
import styles from "./PrintForm.module.css";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const PrintForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<string>("");
  const [printStatus, setPrintStatus] = useState<string>("");

  const validFileTypes = [
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file && validFileTypes.includes(file.type)) {
      setSelectedFile(file);
      setUploadResult("");
    } else {
      setSelectedFile(null);
      setUploadResult(
        "Invalid file type. Please select a file in PNG, PDF, DOC, DOCX, XLS, or XLSX format."
      );
    }
  };

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
      const response = await fetch(`${API_URL}/print`, requestOptions);
      const result = await response.text();
      setUploadResult(result);
    } catch (error) {
      console.error(error);
      setUploadResult("An error occurred while uploading the file.");
    }
  };

  const checkPrintStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}`);

      setPrintStatus(response.data.message);
    } catch (error) {
      console.error(error);
      setPrintStatus("Failed to connect to the server.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fileInput">
          Upload a file (PNG, PDF, DOC, DOCX, XLS, XLSX):
        </label>
        <input
          type="file"
          id="fileInput"
          accept=".png,.pdf,.doc,.docx,.xls,.xlsx"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={!selectedFile}>
          Upload
        </button>
      </form>
      <button onClick={checkPrintStatus} className={styles.checkButton}>
        Check Print Status
      </button>
      {printStatus && <p>{printStatus}</p>}
      {uploadResult && (
        <p
          className={
            uploadResult.includes("Invalid") || uploadResult.includes("error")
              ? styles.error
              : styles.success
          }>
          {uploadResult}
        </p>
      )}
    </div>
  );
};

export default PrintForm;
