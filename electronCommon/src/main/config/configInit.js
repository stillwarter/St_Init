import { systemInfo } from "./config";
import path from "node:path";

let iconpath = null;
let imgpath = null;

/* iconpath init */
if (process.env.NODE_ENV == "development") {
  iconpath = path.join(__dirname, "..", "build/iconpen.png");
} else {
  // 待定完成 todolist
  iconpath = path.join(__dirname, "..", "..", "public/base1.png");
}

/* imgpath init */
if (systemInfo.useImageServe) {
  imgpath = path.join(__dirname, "..", "..", systemInfo.serImagePath);
  // console.log(imgpath,'aaa');
}

export { iconpath, systemInfo, imgpath };
