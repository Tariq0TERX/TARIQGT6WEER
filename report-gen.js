// report-gen.js - توليد تقرير PDF باستخدام jsPDF

const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { jsPDF } = require("jspdf");
require("jspdf-autotable");

const router = express.Router();
const DATA_DIR = path.join(__dirname, "data");

router.post("/generate-pdf", (req, res) => {
  const tasks = req.body;
  const doc = new jsPDF();

  doc.setFont("Cairo", "normal");
  doc.setFontSize(16);
  doc.text("تقرير المهام الأسبوعي", 105, 20, { align: "center" });

  const tableData = tasks.map(t => [
    t.title,
    t.category,
    t.completed ? "تم الإنجاز" : "غير منجزة",
    t.description || "-"
  ]);

  doc.autoTable({
    head: [["العنوان", "التصنيف", "الحالة", "الوصف"]],
    body: tableData,
    startY: 30,
    styles: { font: "Cairo", fontStyle: "normal", halign: 'right' },
    headStyles: { fillColor: [0, 188, 212], halign: 'center' },
  });

  const filename = uuidv4() + ".pdf";
  const filePath = path.join(DATA_DIR, filename);

  fs.writeFileSync(filePath, doc.output("arraybuffer"));

  res.json({ url: `/report/${filename}` });
});

module.exports = router;
