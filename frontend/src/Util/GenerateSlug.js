const generateSlug = (title, id) => {
  const slugPart = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-"); // Replace spaces with dashes
  return `${slugPart}-${id}`;
};

export default generateSlug;
