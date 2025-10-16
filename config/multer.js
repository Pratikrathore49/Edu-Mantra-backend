import multer from "multer";
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.originalUrl);
    let folder = "others";
    if (req.originalUrl.includes("student")) {
      folder = "student";
    } else if (req.originalUrl.includes("question")) {
      folder = "question";
    } else if (req.originalUrl.includes("teacher")) {
      folder = "teacher";
    }
    const uploadPath = path.join(process.cwd(), `../uploads/${folder}`);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replaceAll(" ", "_"));
  },
});

const uploads = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export { uploads };
