import { SignupInputDTO } from '@domains/auth/dto';
import { CommentDTO } from '@domains/comment/dto';
import { PostDTO } from '@domains/post/dto';
import { ReactionDTO } from '@domains/reaction/dto';
import { OffsetPagination } from '@types';
import { ExtendedUserDTO, UserDTO } from '../dto';

export interface UserRepository {
  create(data: SignupInputDTO & { isPrivate?: boolean }): Promise<UserDTO>;
  delete(userId: string): Promise<void>;
  getRecommendedUsersPaginated(options: OffsetPagination): Promise<UserDTO[]>;
  getById(userId: string): Promise<UserDTO | null>;
  getByEmailOrUsername(email?: string, username?: string): Promise<ExtendedUserDTO | null>;
  updateUser(userId: string, data: any): Promise<UserDTO>;
  setPrivacySettings(userId: string, data: any): Promise<UserDTO> | null;
  tweetsLikedByUser(userId: string): Promise<ReactionDTO[] | null>;
  retweetsByUser(userId: string): Promise<ReactionDTO[] | null>;
  commentsByUser(userId: string): Promise<CommentDTO[] | null>;

}