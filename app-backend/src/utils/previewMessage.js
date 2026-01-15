module.exports = function previewMessage(type, payload) {
  switch (type) {
    case "text":
      return `${payload.message.slice(0, 20)}...`;
    case "image":
      return `📷 ${payload.fileName.slice(0, 20)}...`;
    case "file":
      return `📄 ${payload.fileName || "File"}`;
  }
};
