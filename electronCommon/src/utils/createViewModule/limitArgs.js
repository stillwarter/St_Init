/**
 * 限制node传参数量
 */
export function limitArgs(
  args,
  maxCount,
) {
  console.log("获取到的parmas", args);
  if (args.length > maxCount) {
    console.error(`❌ 错误：参数数量超出限制。`);
    console.error(`最多允许 ${maxCount} 个参数，你传入了 ${args.length} 个。`);
    // console.error(`用法：${usage}`);
    process.exit(1);
  }
  return args;
}
