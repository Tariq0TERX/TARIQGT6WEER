// server.js - خادم Node.js لتخزين المهام والتصنيفات وإنشاء التقارير

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

// مجلد البيانات
const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// تحميل المهام
app.get("/api/tasks", (req, res) => {
  const file = path.join(DATA_DIR, "tasks.json");
  if (!fs.existsSync(file)) return res.json([]);
  res.json(JSON.parse(fs.readFileSync(file)));
});

// حفظ المهام
app.post("/api/tasks", (req, res) => {
  const file = path.join(DATA_DIR, "tasks.json");
  const tasks = req.body;
  fs.writeFileSync(file, JSON.stringify(tasks, null, 2));
  res.json({ success: true });
});

// تحميل التصنيفات
app.get("/api/categories", (req, res) => {
  const file = path.join(DATA_DIR, "categories.json");
  if (!fs.existsSync(file)) return res.json([]);
  res.json(JSON.parse(fs.readFileSync(file)));
});

// حفظ التصنيفات
app.post("/api/categories", (req, res) => {
  const file = path.join(DATA_DIR, "categories.json");
  const categories = req.body;
  fs.writeFileSync(file, JSON.stringify(categories, null, 2));
  res.json({ success: true });
});

// إنشاء تقرير PDF مزيّف (تجهيزي، سيتم استبداله لاحقًا)
app.post("/api/report", (req, res) => {
  const filename = uuidv4() + ".pdf";
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, "تقرير المهام: سيتم توليده لاحقًا.");
  res.json({ url: `/report/${filename}` });
});

// تقديم ملفات التقرير
app.use("/report", express.static(DATA_DIR));

app.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`);
});
