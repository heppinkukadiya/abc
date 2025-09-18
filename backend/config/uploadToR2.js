// uploadToR2.js
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_UPLOAD_URL,
    credentials: {
        accessKeyId: process.env.R2_UPLOAD_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_UPLOAD_SECRET_ACCESS_KEY,
    },
});

async function uploadFileToR2(key, body, contentType) {
    try {
        const params = {
            Bucket: process.env.R2_UPLOAD_BUCKET_NAME,
            Key: key,
            Body: body,
            ContentType: contentType || "application/octet-stream",
        };

        await s3.send(new PutObjectCommand(params));

        return true;
    } catch (error) {
        console.error("Error uploading to Cloudflare R2:", error);
        throw error;
    }
}

module.exports = { uploadFileToR2 };
