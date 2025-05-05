const fs = require("fs");
const path = require("path");
const Client = require("ssh2-sftp-client");
const sftp = new Client();

require("dotenv").config();

const SFTP_CONFIG = {
  host: process.env.SFTP_HOST,
  port: process.env.SFTP_PORT,
  username: process.env.SFTP_USER,
  password: process.env.SFTP_PASS,
};

exports.getPublicImageUrl = (filename) => {
  return `${process.env.SYN_PUBLIC_URL}${filename}`;
};

exports.uploadFilesToSynology = async (files) => {
  const uploadedUrls = [];

  try {
    await sftp.connect(SFTP_CONFIG);

    for (const file of files) {
      const remotePath = path.posix.join(
        process.env.SFTP_REMOTE_PATH,
        file.filename
      );
      try {
        await sftp.put(file.path, remotePath);
        uploadedUrls.push(exports.getPublicImageUrl(file.filename));
        fs.unlinkSync(file.path); // delete local file
      } catch (err) {
        console.error("File upload failed for:", file.filename, err.message);
      }
    }
  } catch (err) {
    console.error("SFTP connection error:", err.message);
  } finally {
    await sftp.end();
  }

  return uploadedUrls;
};
