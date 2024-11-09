import axios from "axios";

// Interface for file data
interface FileData {
  _id: string; // Add _id if it’s expected in the response
  filename: string;
  views: number;
  tags: string[];
}

// Upload a new file with tags
export const uploadFile = async (file: File, tags: string): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("tags", tags);

  await axios.post(
    `${process.env.REACT_APP_API_URL}/api/files/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// Fetch all files for the current user
export const getFiles = async (): Promise<FileData[]> => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/files`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

// Generate a shareable link for a file
export const generateShareLink = async (fileId: string): Promise<string> => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/share/generate-link/${fileId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data.shareableLink;
};

// Get statistics for a specific file
export const getFileStatistics = async (fileId: string): Promise<FileData> => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/files/stats/${fileId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
