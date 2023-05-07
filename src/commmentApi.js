export const createComment = async (text, parentId = null, userId) => {
  return {
    id: crypto.randomUUID(),
    body: text,
    parentId,
    userId,
    username: "John",
    createdAt: new Date().toISOString(),
  };
};
