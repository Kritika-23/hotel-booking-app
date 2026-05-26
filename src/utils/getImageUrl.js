export const getImageUrl = (img) => {
  if (!img) return "/placeholder.jpg";

  if (img.startsWith("http://") || img.startsWith("https://")) {
    return img;
  }

  const baseUrl = (
    import.meta.env.VITE_SERVER_URL || "http://localhost:4000"
  ).replace(/\/+$/, "");

  return `${baseUrl}${img.startsWith("/") ? img : `/${img}`}`;
};
