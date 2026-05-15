export const getImageUrl = (img) => {
  if (!img) return "/placeholder.jpg";
  return `http://localhost:4000${img}`;
};