import React, { useState, useEffect } from "react";
import FileUpload from "../components/Files/FileUpload";
import FileList from "../components/Files/FileList";
import FileStatistics from "../components/Files/FileStatistics";
import { useAuth } from "../hooks/useAuth";
import { getFiles } from "../services/fileService";
import Navbar from "../components/Navbar";

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const [files, setFiles] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const fetchFiles = async () => {
    setLoadingItems(true);
    try {
      const filesData: any = await getFiles();
      setFiles(filesData);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
    setLoadingItems(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleViewStatistics = (fileId: string) => {
    setSelectedFileId(fileId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <Navbar onLogout={logout} />

      {/* Upload Section */}
      <section className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md mt-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Upload New File
        </h2>
        <FileUpload onFileUpload={fetchFiles} />
      </section>

      {/* File List Section with Loading State */}
      <section className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Files</h2>
        <FileList
          files={files}
          onViewStatistics={handleViewStatistics}
          onReload={fetchFiles}
          loadingItems={loadingItems}
        />
      </section>

      {/* File Statistics Section */}
      {selectedFileId && (
        <section className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">File Statistics</h2>
          <FileStatistics fileId={selectedFileId} />
        </section>
      )}
    </div>
  );
};

export default Dashboard;
