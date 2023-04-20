// import { prismaMock } from '@prisma/client/runtime';
// import { User } from '@prisma/client';

// const mockUser: User = {
//   id: 'user-id',
//   username: 'valentino',
//   name: 'Mock User',
//   email: 'valentino@gmail.com',
//   password: 'uno123STRING!!!',
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   deletedAt: null,
//   isPrivate: false,
// };

// const mockDb = {
//   user: {
//     update: jest.fn().mockResolvedValue(mockUser),
//   },
// };
// const mockPrisma = prismaMock;
// mockPrisma.user = jest.fn(() => mockDb.user);

// describe('User controller', () => {
//     describe('setPrivacySettings function', () => {
//       it('should update the user privacy settings and return a UserDTO', async () => {
//         const controller = new UserController(new UserService(mockPrisma));
//         const req = { body: { isPrivate: true }, params: {} } as Request;
//         const res = { locals: { context: { userId: 'user-id' } }, status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
        
//         const result = await controller.setPrivacySettings(req, res);
  
//         expect(mockDb.user.update).toHaveBeenCalledWith({
//           where: { id: 'user-id' },
//           data: { isPrivate: true },
//         });
//         expect(result).toEqual({ message: 'You have succesfuly changed your privacy settings!' });
//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({ message: 'You have succesfuly changed your privacy settings!' });
//       });
//     });
//   });
  

