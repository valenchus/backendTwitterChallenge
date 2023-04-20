export class ReactionDTO {
    id: string;
    userId: string;
    postId: string;
    type: string;
    createdAt: Date;
  
    constructor(reaction: ReactionDTO) {
      this.id = reaction.id;
      this.userId = reaction.userId;
      this.postId = reaction.postId;
      this.type = reaction.type;
      this.createdAt = reaction.createdAt;
    }
  }
  