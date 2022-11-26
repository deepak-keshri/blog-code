const express = require("express");
const router = express.Router();

const {addPost, allPost, deletePost, showAllPost, getPost, updatePost} = require("./../controller/BlogpostController.js");

router.post("/addpost", addPost);
// router.get("/addpost", editPost);
router.get("/allpost", allPost);
router.post("/delete",deletePost);
router.get("/getAllPost",showAllPost)
router.post("/getpost", getPost);
router.post("/updatepost", updatePost);

module.exports = router;