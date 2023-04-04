export class FollowerDTO {
  
    constructor(follower: FollowerDTO) {
      this.id = follower.id;
      this.followerId = follower.followerId;
      this.followedId = follower.followedId;
      this.createdAt = follower.createdAt;
    }
  
    id: string;
    followerId: string | null;
    followedId: string | null;
    createdAt: Date;
  }

  
  