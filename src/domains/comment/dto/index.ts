export class CommentDTO {
    constructor(comment: CommentDTO) {
        this.id = comment.id;
        this.content = comment.content;
        this.userId = comment.userId;
        this.postId = comment.postId;
      }
    id: string;
    content: string;
    userId: string;
    postId: string;
  }

