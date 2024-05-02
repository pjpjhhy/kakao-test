import "dotenv/config";
import express from "express";
import { coursePage, introducePage, mainPage } from "./controller/webController.js";
import db from "./config/db.js";
import { getCourseList } from "./controller/courseController.js";


const app = express();
const PORT = 8000;

// 템플릿 엔진 사용 셋팅
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/client/html");

// 정적 파일 내보내기
app.use("/css", express.static("src/client/css"));
app.use("/js", express.static("src/client/js"));
app.use("/file", express.static("src/client/file"));

// JSON 형식 변환 미들웨어
app.use(express.json())

// webRouter
app.get("/", mainPage); 
app.get("/introduce", introducePage);
app.get("/course", coursePage);

// apiRouter
app.get("/api/course", getCourseList);

// 서버 오픈
app.listen(PORT, () => {
  console.info(`서버가 열렸다. http://localhost:${PORT}`);
});
