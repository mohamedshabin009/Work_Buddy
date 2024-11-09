import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './user.dto';

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  role: 'EMPLOYEE',
  mobileNumber: '1234567890',
  profileImage: 'profile.jpg',
};

describe('UserService', () => {
  let service: UserService;
  let mockRepository: Repository<User>;

  const mockRepositoryMethods = {
    findOne: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepositoryMethods },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user successfully', async () => {
    const userDto: CreateUserDto = {
      name: 'Jane Doe',
      password: 'password123',
      role: 'MANAGER',
      email: 'jan@example.com',
      mobileNumber: '+913456789022',
      profileImage: 'image.png',
    };

    mockRepositoryMethods.findOne.mockResolvedValueOnce(null); // No existing user
    mockRepositoryMethods.save.mockResolvedValueOnce(userDto);

    await service.createUser(userDto);

    expect(mockRepositoryMethods.findOne).toHaveBeenCalledWith({
      where: [{ email: userDto.email }, { name: userDto.name }],
    });
    expect(mockRepositoryMethods.save).toHaveBeenCalledWith(userDto);
    // expect(result).toEqual(mockUser);
  });

  it('should BadRequestException if not create a user', async () => {
    const userDto: CreateUserDto = {
      name: 'kkkk',
      password: 'password123',
      role: 'MANAGER',
      email: 'jan@example.om',
      mobileNumber: '+913456789022',
      profileImage: 'image.png',
    };
    mockRepositoryMethods.findOne.mockResolvedValueOnce(userDto);
    await expect(service.createUser(userDto)).rejects.toThrow(
      BadRequestException || NotFoundException,
    );
  });

  it('should return all user', async () => {
    await service.getAll();
    expect(mockRepositoryMethods.find).toHaveBeenCalledWith();
  });

  it('should bad Req if not', async () => {
    mockRepositoryMethods.find.mockResolvedValue([mockUser]);
    await expect(service.getAll).rejects.toThrow(BadRequestException);
  });

  it('should give  user By Id', async () => {
    const userId = 1;
    mockRepositoryMethods.findOne.mockResolvedValueOnce(mockUser);
    await service.getById(userId);
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: userId },
    });
  });

  it('should Bad Request Exception if no user By Id', async () => {
    const userId = 1;
    await expect(service.getById(userId)).rejects.toThrow(BadRequestException);
  });

  it('should update user', async () => {
    const userId = 1;
    const mockUpdate = {
      mobileNumber: '+919786001100',
    };
    mockRepositoryMethods.findOne.mockResolvedValue(mockUser); // No existing user
    mockRepositoryMethods.update.mockResolvedValue({ affected: 1 });

    await service.updateUser(userId, mockUpdate);
    expect(mockRepositoryMethods.findOne).toHaveBeenCalledWith({
      where: { id: userId },
    });
    expect(mockRepositoryMethods.update).toHaveBeenCalledWith(
      userId,
      mockUpdate,
    );
  });

  it('should BadReq if not', async () => {
    const userId = 1;
    const mockUpdate = {
      mobileNumber: '+919786001100',
    };
    mockRepositoryMethods.findOne.mockResolvedValue(null); // No existing user
    await expect(service.updateUser(userId, mockUpdate)).rejects.toThrow(
      BadRequestException || NotFoundException,
    );
  });
  describe('delete', () => {
    it('should delete user', async () => {
      const userId = 1;
      mockRepositoryMethods.delete.mockResolvedValue({ affected: 1 });
      await service.deleteUser(userId);
      expect(mockRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('should Bad Request Exception if no delete', async () => {
      const userId = 1;
      mockRepositoryMethods.delete.mockResolvedValue({ affected: 0 });
      await expect(service.deleteUser(userId)).rejects.toThrow(
        BadRequestException || NotFoundException,
      );
    });
  });

  it('should search user name', async () => {
    const userName = 'kane';
    mockRepositoryMethods.find.mockResolvedValue([mockUser]);
    await service.searchUserName(userName);
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { name: ILike(`%${userName}%`) },
    });
  });

  it('should bad req if not search user name', async () => {
    const userName = 'shabin';
    mockRepositoryMethods.find.mockResolvedValue([]);
    await expect(service.searchUserName(userName)).rejects.toThrow(
      BadRequestException || NotFoundException,
    );
  });
});
//   //=====================================================
