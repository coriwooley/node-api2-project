// implement your posts router here
const express = require('express')
const router = express.Router()
const Posts = require('./posts-model')

router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved"
        })
    })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await Posts.findById(id)
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(post)
        }
    } catch{
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    }
})

router.post("/", (req, res) => {
  const newPost = req.body;
  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      message: "Please provide the title and contents for the post",
    });
  } else {
    Posts.insert(newPost)
    .then(post => {
        return Posts.findById(post.id)
    })
    .then(post => res.status(201).json(post))
    .catch(err => {
        res.status(500).json({
            message:"There was an error while saving to post to the database"
        })
    })
  }
});

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    if(!changes.title || !changes.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Posts.findById(id)
        .then(post => {
            if(!post){
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else { 
                return Posts.update(id, changes)
            }
        })
        .then(success => {
            if(success){
                return Posts.findById(id)
            }
        })
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })
    }
})

router.delete('/:id', async (req, res) => {
   const id = req.params.id
   try {
       const post = await Posts.findById(id)
       if(!post){
           res.status(404).json({
               message: "The post with the specified ID does not exist"
           })
       } else {
           await Posts.remove(id)
           res.json(post)
       }
   } catch {
       res.status(500).json({
           message: "The post could not  be removed"
       })
   }
})

router.get('/:id/comments', async (req, res) => {
    const id = req.params.id
    try {
        const post = await Posts.findById(id)
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            const comments = await Posts.findPostComments(id)
            res.json(comments)
        }
    } catch {
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })
    }
})


module.exports = router