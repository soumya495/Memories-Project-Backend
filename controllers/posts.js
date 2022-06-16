import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new PostMessage(post)
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const updPost = req.body

  if (!mongoose.isValidObjectId(_id))
    res.status(404).json({ message: 'No Post with id found!' })

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, updPost, {
    new: true,
  })

  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.isValidObjectId(_id))
    res.status(404).json({ message: 'No Post with id found!' })

  await PostMessage.findByIdAndRemove(_id)

  res.json({ message: 'Post Deleted Successfully!' })
}
