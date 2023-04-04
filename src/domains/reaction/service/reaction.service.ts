export interface ReactionService {
      create(followerId: String, followedId: String, type: String): Promise<void>;
      delete(postId: String, type: String): Promise<void>;
    }