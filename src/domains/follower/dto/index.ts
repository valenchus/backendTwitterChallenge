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
  
  // export class ExtendedFollowerDTO extends FollowerDTO {
  
  //   constructor(follower: ExtendedFollowerDTO) {
  //     super(follower)
  //     // this.email = follower.email;
  //     // this.name = follower.name;
  //     // this.password = follower.password;
  //   }
  
  //   email!: string;
  //   username!: string;
  //   password!: string;
  // }
  
  