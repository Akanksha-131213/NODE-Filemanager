import express from "express";
import {
  getFiles,
  createFiles,
  // getFile,
  deleteFile,
  updateFile,
} from "../controller/files.js";
import {
  createFolders,
  getFolders,
  deleteFolder,
} from "../controller/folder.js";
const router = express.Router();
router.get("/files", getFiles);
router.get("/folders", getFolders);
// router.get("/file/:id", getFile);
router.delete("/file/:id", deleteFile);
router.delete("/folder/:id", deleteFolder);
router.put("/file/:id", updateFile);
router.post("/file/add", createFiles);
router.post("/folder/add", createFolders);

export default router;
