export class ReactionDTO {
    id: string;
    userId: string;
    postId: string;
    reaction: string;
    createdAt: Date;
  
    constructor(reaction: ReactionDTO) {
      this.id = reaction.id;
      this.userId = reaction.userId;
      this.postId = reaction.postId;
      this.reaction = reaction.reaction;
      this.createdAt = reaction.createdAt;
    }
  }
  