import * as express from 'express';
import {PostsRequest} from './types.ts';
import {PostsSchema} from '../models/posts.ts';
import {sendError} from '../utils/sendError.ts';

const CreatePost = async (req: express.Request<any,any, PostsRequest>, res: express.Response) => {
    try {
      const doc = new PostsSchema({
        user: req.body.userId,
        imageUrl: req.body.imageUrl
      })
      const post = await doc.save()

      res.json(post)
    }catch (e) {
      sendError({res, errorCode: 500, messageText: 'Что-то пошло не так'})
    }
}

const GetPosts = async (req: express.Request<any,any, PostsRequest>, res: express.Response) => {
  try {

    const post = await PostsSchema.find().populate('user').exec()
    res.json(post)
  }catch (e) {
    sendError({res, errorCode: 500, messageText: 'Что-то пошло не так'})
  }
}

export const PostsControllers = {
  CreatePost,
  GetPosts
}
