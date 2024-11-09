import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as FileService from "../../services/fileService";

interface FileUploadProps {
  onFileUpload: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const onDrop = async (acceptedFiles: File[]) => {
    if (!tags.trim()) {
      setError("Please enter at least one tag before uploading.");
      return;
    }
    setError("");

    try {
      const file = acceptedFiles[0];
      await FileService.uploadFile(file, tags);
      alert("File uploaded successfully");
      setTags("");
      onFileUpload();
    } catch (error) {
      alert("Failed to upload file");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={tags}
        placeholder="Tags (comma-separated)"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setTags(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div
        {...getRootProps({
          className:
            "flex flex-col items-center justify-center w-full h-32 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-gray-500 hover:border-blue-400 hover:bg-gray-100 focus:outline-none",
        })}
      >
        <input {...getInputProps()} />
        <p className="text-center text-gray-500">
          Drag 'n' drop a file here, or click to select a file
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
