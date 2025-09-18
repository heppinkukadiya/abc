const multer = require("multer");
const path = require("path");


const uploadPath = path.join(__dirname, "../uploads");

const storage  =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});


const upload = multer({ storage });

module.exports = upload;
