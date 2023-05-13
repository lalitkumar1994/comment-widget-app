export const createComment = async (text, parentId = null, userId) => {
  return {
    id: crypto.randomUUID(),
    body: text,
    parentId,
    userId,
    username: "John",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return {
    body: text,
    updatedAt: new Date().toISOString(),
  };
};
