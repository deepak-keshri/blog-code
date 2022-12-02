const db = require("./../modules/index.js");
const Blog = db.Blogpost;

const addPost = (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    const title = data.title;
    const content = data.content;

    Blog.create({ userId, title, content }).then(() => {
        res.status(200).json({
            msg: "Post Created",
            success: true
        })
    }).catch((err) => {
        res.status(500).json({
            err
        })
    })
}


const allPost = (req, res) => {
    const userId = req.body.userId;
    console.log(userId);
    Blog.findAll({ where: { userId } }).then((data) => {
        if (data) {
            return res.status(200).json({
                msg: "Data Found",
                data: data,
                success: true
            })
        }
    }).catch((err) => {
        res.status(500).json({
            err
        })
    })
}

const deletePost = (req, res) => {
    const id = req.body.id;
    Blog.destroy({ where: { id } }).then((data) => {
        if (data) {
            return res.status(200).json({
                msg: "Data Deleted",
                data: data,
                success: true
            })
        }
    }).catch((err) => {
        res.status(500).json({ err })
    })
}

const showAllPost = (req, res) => {
    const userId = 1;

    Blog.findAll().then((data) => {
        if (data) {
            return res.status(200).json({
                msg: "Data Found",
                data: data,
                success: true
            })
        }
    }).catch((err) => {
        res.status(403).json({ err });
    })
}
const getPost = (req, res) => {
    const userId = 1;
    const id = req.body.id;

    Blog.findOne({ where: { id: id } }).then((data) => {
        if (data) {
            return res.status(200).json({
                msg: "Data Found",
                data: data,
                success: true
            })
        }
    }).catch((err) => {
        res.status(403).json({ err })
    })
}

const updatePost = async (req, res) => {
    const id = req.body.id;
    const content = req.body.content;
    const title = req.body.title;
    console.log(req.body);
    
    try{
      await Blog.update({  content, title}, { where: { id } })
      return res.status(200).json({ msg:"update Success", success: true});
    }
    catch(err){
      res.status(403).json({ err });
    }
}
module.exports = { addPost, allPost, deletePost, showAllPost, getPost, updatePost }
