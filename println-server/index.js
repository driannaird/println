const express = require("express");
const multer = require("multer");
const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const localIpAddress = require("local-ip-address");
const cors = require("cors");

const uploadDir = path.join(os.tmpdir(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const app = express();
app.use(cors());

const exePath = "SumatraPDF-3.4.6-32.exe";

// Route untuk menangani upload file dan cetak
app.post(
  "/print",
  multer({ storage: diskStorage }).single("file"),
  (req, res) => {
    if (req.file) {
      execFile(
        exePath,
        ["-print-to-default", "-silent", req.file.path],
        (err, stdout, stderr) => {
          if (err) {
            console.log("Error:", err.message);
            fs.unlinkSync(req.file.path);
            return res
              .status(500)
              .send(
                "Error printing file. Please check your pdf file or printer status"
              );
          }
          console.log(`Success print ${req.file.originalname}`);

          fs.unlinkSync(req.file.path);

          res.send("File printed successfully!");
        }
      );
    } else {
      res.status(400).send("No file uploaded.");
    }
  }
);

// Endpoint root untuk cek server
app.get("/", (req, res) => {
  return res.json({ message: "Connected" });
});

app.listen(6736, () => {
  console.log(`println ready!🔥🔥🔥🔥 \nYour server ip: ${localIpAddress()}`);
});
