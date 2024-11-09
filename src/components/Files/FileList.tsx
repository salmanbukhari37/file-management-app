import React, { useState } from "react";
import ShareLink from "./ShareLink";
import { FiRefreshCw } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";

interface File {
  _id: string;
  filename: string;
  views: number;
  tags: string[];
}

interface FileListProps {
  files: File[];
  onViewStatistics: (fileId: string) => void;
  onReload: () => Promise<void>;
  loadingItems: boolean;
}

const FileList: React.FC<FileListProps> = ({
  files,
  onViewStatistics,
  onReload,
  loadingItems,
}) => {
  const [loading, setLoading] = useState(false);

  const handleReload = async () => {
    setLoading(true);
    await onReload();
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">File(s) List</h2>

        {/* Reload Button with Loader */}
        <button
          onClick={handleReload}
          disabled={loading}
          className="flex items-center px-3 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
        >
          {loading ? (
            <ImSpinner8 className="animate-spin mr-2" />
          ) : (
            <FiRefreshCw className="mr-2" />
          )}
          {loading ? "Loading..." : "Reload"}
        </button>
      </div>

      {loadingItems ? (
        // Skeleton Loading Items
        <ul className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <li
              key={index}
              className="bg-gray-200 animate-pulse p-4 rounded-lg shadow-sm space-y-2"
            >
              <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            </li>
          ))}
        </ul>
      ) : (
        // Actual File List
        <ul className="space-y-4">
          {files.map((file) => (
            <li
              key={file._id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Display Image */}
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={`${process.env.REACT_APP_API_URL}uploads/${file.filename}`}
                  alt={file.filename}
                  className="w-24 h-24 object-cover rounded-md border border-gray-300"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    Filename: {file.filename}
                  </p>
                  <p className="text-sm text-gray-600">Views: {file.views}</p>
                  <p className="text-sm text-gray-600">
                    Tags: {file.tags.join(", ")}
                  </p>
                </div>
              </div>

              {/* Action Buttons and Share Link */}
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <ShareLink
                    fileId={file._id}
                    onViewStatistics={onViewStatistics}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
