import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockService = {
  createUser: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  searchUserName: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should create new data', async () => {
      const user = {
        name: 'marcelo',
        password: 'mar@123',
        role: 'EMPLOYEE',
        email: 'celo@gmail.com',
        mobileNumber: '+919876204440',
        profileImage: 'm6.png',
      } as any;
      await controller.createUser(user);
      expect(userService.createUser).toHaveBeenCalledWith(user);
    });
  });

  describe('getAllUser', () => {
    it('should return all data', async () => {
      await controller.getAllUsers();
      expect(userService.getAll).toHaveBeenCalledWith();
    });
  });

  describe('getUserById', () => {
    it('should return specified data', async () => {
      const user = 10;
      await controller.getUserById({ id: user });
      expect(userService.getById).toHaveBeenCalledWith(user);
    });
  });

  describe('updateUser', () => {
    it('should update the data', async () => {
      const user = 10;
      const updateUser = {
        mobileNumber: '+919786001100',
      };
      await controller.updateUser(updateUser, user);
      expect(userService.updateUser).toHaveBeenCalledWith(user, updateUser);
    });
  });

  describe('delete', () => {
    it('should delete the data', async () => {
      const user = 10;
      await controller.deleteUser(user);
      expect(userService.deleteUser).toHaveBeenCalledWith(user);
    });
  });

  describe('search/user', () => {
    it('should return searched data', async () => {
      const userName = 'ka';
      await controller.searchUser({ name: userName });
      expect(userService.searchUserName).toHaveBeenCalledWith(userName);
    });
  });
});
