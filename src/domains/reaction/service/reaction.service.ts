export interface ReactionService {
    //   deleteUser(userId: any): Promise<void>;
      create(followerId: String, followedId: String, type: String): Promise<void>;
      delete(postId: String, type: String): Promise<void>;
    }