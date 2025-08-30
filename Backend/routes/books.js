import express from "express";
import { getBooks, addBook, deleteBook } from "../controller/BookController.js";
import { authorize } from "../middleware/authorize.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", requireAuth, authorize("admin","librarian"), addBook);
router.delete("/:id", requireAuth, authorize("admin", "librarian"), deleteBook);

export default router;
