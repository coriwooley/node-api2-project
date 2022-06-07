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

router.post('/', (req, res) => {
    //stuff
})

router.put('/:id', (req, res) => {
    //stuff
})

router.delete('/:id', (req, res) => {
    //stuff
})

router.get('/:id/comments', (req, res) => {
    //stuff
})


module.exports = router