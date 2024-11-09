import React, { useEffect, useState } from "react";
import { getFileStatistics } from "../../services/fileService";

interface FileStatisticsProps {
  fileId: string;
}

const FileStatistics: React.FC<FileStatisticsProps> = ({ fileId }) => {
  const [stats, setStats] = useState<{
    filename: string;
    views: number;
    tags: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true); // Set loading state before fetching
      try {
        const data = await getFileStatistics(fileId);
        setStats(data);
      } catch (error) {
        console.error("Error fetching file statistics:", error);
      }
      setLoading(false); // Clear loading state after fetching
    };
    fetchStatistics();
  }, [fileId]);

  if (loading) {
    // Display loading skeleton when data is being fetched
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      {/* Image Preview */}
      <div className="mb-4">
        <img
          src={`${process.env.REACT_APP_API_URL}uploads/${stats.filename}`}
          alt={stats.filename}
          className="w-full h-64 object-cover rounded-lg shadow-sm"
        />
      </div>

      {/* File Details */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-gray-900 font-medium text-lg">{stats.filename}</p>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Views:</span> {stats.views}
        </p>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Tags:</span> {stats.tags.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default FileStatistics;
