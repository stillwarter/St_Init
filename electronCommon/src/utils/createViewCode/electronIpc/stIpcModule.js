export function setIpcMainModule(fnNameList) {
  const mainlist = [];
  for (const item of fnNameList) {
    const channelName = item + "defaultChannel";
    mainlist.push({
      channel: channelName,
      type: "answer",
      description: channelName,
      handler: null,
    });
  }
  // 使用String.raw避免转义问题，保持模板格式整洁
  return String.raw`
export const resourceMainList=${JSON.stringify(mainlist)}
  `.trimStart(); // 移除开头的空行
}
