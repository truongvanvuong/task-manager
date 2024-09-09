import axios from "axios";
const upload_preset = import.meta.env.VITE_CLOUD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();

  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      uploadData
    );
    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      console.error("Upload failed with status:", response.status);
      return { success: false, error: "Upload failed" };
    }
  } catch (error) {
    console.error("Error during upload:", error);
    return { success: false, error };
  }
};
export default uploadImageToCloudinary;
