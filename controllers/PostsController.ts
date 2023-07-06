import * as express from 'express';
import {PostsRequest} from './types.ts';
import {PostsSchema} from '../models/posts.ts';

export const CreatePost = async (req: express.Request<any,any, PostsRequest>, res: express.Response) => {
    try {
      const doc = new PostsSchema({
        user: req.body.userId,
        imageUrl: req.body.imageUrl
      })
      const post = await doc.save()

      res.json(post)
    }catch (e) {
      res.status(500).json({
        msg: 'Не удалось создать статью'
      })
    }
}

export const GetPosts = async (req: express.Request<any,any, PostsRequest>, res: express.Response) => {
  try {

    const post = await PostsSchema.find().populate('user').exec()
    console.log(post)
    res.json(post)
  }catch (e) {
    res.status(500).json({
      msg: 'Не удалось получить статьи'
    })
  }
}

