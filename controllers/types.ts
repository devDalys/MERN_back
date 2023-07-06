export interface UserRequest {
  userId?: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string
}

export interface PostsRequest {
  imageUrl: string;
  user: UserRequest
  userId: string
}
