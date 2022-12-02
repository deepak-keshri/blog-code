const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
// console.log("------")
// console.log("Auth is ", auth)
// console.log("-----")

const { addPost, allPost, deletePost, showAllPost, getPost, updatePost } = require("./../controller/BlogpostController.js");

router.post("/addpost", addPost);
// router.get("/addpost", editPost);
router.post("/allpost", auth, allPost);
router.post("/delete", auth, deletePost);
router.get("/getAllPost", auth, showAllPost)
router.post("/getpost", auth, getPost);
router.post("/updatepost", auth, updatePost);

module.exports = router;