import React, { useState } from "react";
import { generateShareLink } from "../../services/fileService";

interface ShareLinkProps {
  fileId: string;
  onViewStatistics: (fileId: string) => void;
}

const ShareLink: React.FC<ShareLinkProps> = ({ fileId, onViewStatistics }) => {
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateShareLink = async () => {
    setLoading(true);
    try {
      const link = await generateShareLink(fileId);
      setShareableLink(link);
    } catch (error) {
      console.error("Failed to generate share link:", error);
      alert("Failed to generate share link");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* Buttons Row */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleGenerateShareLink}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          {loading ? "Generating..." : "Generate Share Link"}
        </button>

        <button
          onClick={() => onViewStatistics(fileId)}
          className="px-4 py-2 bg-gray-500 text-white text-sm font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          View Statistics
        </button>
      </div>

      {/* Display Shareable Link */}
      {shareableLink && (
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
          <p className="text-gray-700 font-medium mb-1">Shareable Link:</p>
          <a
            href={shareableLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-words"
          >
            {shareableLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default ShareLink;
