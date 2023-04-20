import { CommentDTO } from '@domains/comment/dto';
import { PostDTO } from '@domains/post/dto';
import { ReactionDTO } from '@domains/reaction/dto';
import { NotFoundException } from '@utils/errors';
import { OffsetPagination } from 'types';
import { UserDTO } from '../dto';
import { UserRepository } from '../repository';
import { UserService } from './user.service';

export class UserServiceImpl implements UserService {
  constructor(private readonly repository: UserRepository) {}

  async getUser(userId: any): Promise<UserDTO> {
    const user = await this.repository.getById(userId);
    if (!user) throw new NotFoundException('user');
    return user;
  }

  getUserRecommendations(userId: any, options: OffsetPagination): Promise<UserDTO[]> {
    // TODO: make this return only users followed by users the original user follows
    return this.repository.getRecommendedUsersPaginated(options);
  }

  deleteUser(userId: any): Promise<void> {
    return this.repository.delete(userId);
  }
  setPrivacySettings(userId: string, isPrivate: boolean): Promise<UserDTO> | null{
    return this.repository.setPrivacySettings(userId,isPrivate);
  }
  tweetsLikedByUser(userId: string): Promise<ReactionDTO[] | null> {
    return this.repository.tweetsLikedByUser(userId);
  }
  retweetsByUser(userId: string): Promise<ReactionDTO[] | null> {
    return this.repository.retweetsByUser(userId);
  }
  commentsByUser(userId: string): Promise<CommentDTO[] | null> {
    return this.repository.commentsByUser(userId);
  }
}
