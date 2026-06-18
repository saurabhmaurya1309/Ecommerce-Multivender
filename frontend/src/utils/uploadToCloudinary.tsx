export const uploadToCloudinary = async (file: any) => {
  const cloudName = "dxiv2fohz";
  const uploadPreset = "mutivender";

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const fileData = await res.json();

  if (!res.ok) {
    throw new Error(fileData.error?.message || "Upload failed");
  }

  return fileData.secure_url;
};
