import { Test, TestingModule } from '@nestjs/testing';
import { LeaveService } from './leave.service';
import { DeleteResult, Repository } from 'typeorm';
import { Leave } from './leave.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateLeaveDto, UpdateLeaveDto } from './leave.dto';
describe('LeaveService', () => {
  let service: LeaveService;
  let mockRepository: Repository<Leave>;

  const mockLeaveService = {
    delete: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  const mockUserService = {
    getById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeaveService,
        {
          provide: getRepositoryToken(Leave),
          useValue: mockLeaveService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<LeaveService>(LeaveService);
    mockRepository = module.get<Repository<Leave>>(getRepositoryToken(Leave));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create leave', async () => {
    const userId = 1;
    const userMock = {
      id: 2,
      name: 'Athil',
      password: 'Athil@123',
      role: 'EMPLOYEE',
      email: 'athilj@gmail.com',
      mobileNumber: '+919876511003',
      profileImage: 'gk.png',
    };

    const mockLeave: CreateLeaveDto = {
      startDate: new Date('2024-10-28'),
      endDate: new Date('2024-10-29'),
      reason: 'I should go to Passport office',
      leaveType: 'CASUAL',
      status: 'APPROVED',
      created_At: new Date('2024-10-28'),
    };
    const saveMockLeave = { id: 1, ...mockLeave, user: userMock };
    mockUserService.getById.mockReturnValue(userMock);
    mockLeaveService.save.mockReturnValue(saveMockLeave);
    await service.createLeave(mockLeave, userId);
    expect(mockUserService.getById).toHaveBeenCalledWith(userId);
    expect(mockLeaveService.save).toHaveBeenCalledWith({
      ...mockLeave,
      user: userMock,
    });
  });

  it('should BadRequestException if not create a Leave', async () => {
    mockUserService.getById.mockResolvedValueOnce(null);
    await expect(service.createLeave).rejects.toThrow(BadRequestException);
  });

  describe('get all leave', () => {
    it('should retrieve all', async () => {
      const leaveMock = {
        id: 32,
        startDate: '2024-10-26T18:30:00.000Z',
        endDate: '2024-10-29T18:30:00.000Z',
        reason: 'Viral Fewer',
        leaveType: 'SICK',
        status: 'PENDING',
        created_At: '17:28:22.235568',
      };
      mockLeaveService.find.mockReturnValue([leaveMock]);
      await service.getAllLeave();
      expect(mockLeaveService.find).toHaveBeenCalledWith({
        relations: ['user'],
      });
    });

    it('should Bad Req if not retrieve all', async () => {
      mockLeaveService.find.mockResolvedValue(null);
      await expect(service.getAllLeave).rejects.toThrow(BadRequestException);
    });
  });

  it('should retrieve leave by Id', async () => {
    const leaveId = 2;
    const mockLeave = {
      id: 32,
      startDate: '2024-10-26T18:30:00.000Z',
      endDate: '2024-10-29T18:30:00.000Z',
      reason: 'Viral Fewer',
      leaveType: 'SICK',
      status: 'PENDING',
      created_At: '17:28:22.235568',
    };
    mockLeaveService.findOne.mockReturnValue(mockLeave);
    await service.getLeaveById(leaveId);
    expect(mockLeaveService.findOne).toHaveBeenCalledWith({
      where: { id: leaveId },
      relations: ['user'],
    });
  });

  it('should Bad Req if not retrieve leave by Id', async () => {
    const leaveId = 32;
    mockLeaveService.findOne.mockReturnValue(null);
    await expect(service.getLeaveById(leaveId)).rejects.toThrow(
      BadRequestException,
    );
  });
  describe('get by user id', () => {
    it('should retrieve leave by User Id', async () => {
      const userId = 2;
      const mockLeave = {
        id: 33,
        startDate: '2024-10-27T18:30:00.000Z',
        endDate: '2024-10-27T18:30:00.000Z',
        reason: 'Stomach Pain',
        leaveType: 'SICK',
        status: 'APPROVED',
        created_At: '17:30:32.137034',
        user: {
          id: 10,
          name: 'starc',
          password: 'starc@123',
          role: 'MANAGER',
          email: 'starc56@gmail.com',
          mobileNumber: '+919876202020',
          profileImage: 's56.png',
        },
      };
      mockLeaveService.findOne.mockReturnValue(mockLeave);
      await service.getLeaveRequestsByUserId(userId);
      expect(mockLeaveService.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ['user'],
      });
    });

    it('should BadRequestException if not retrieve leave by User Id', async () => {
      const userId = 2;
      mockLeaveService.findOne.mockResolvedValue(null);
      await expect(service.getLeaveRequestsByUserId(userId)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('delete', () => {
    it('Should delete the data successfully when entity exists', async () => {
      const id = 1;
      const deleteLeave: DeleteResult = {
        affected: 1,
        raw: undefined,
      };
      jest.spyOn(mockLeaveService, 'delete').mockResolvedValue(deleteLeave);

      const result = await service.deleteLeave(id);
      expect(mockLeaveService.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(deleteLeave);
    });

    it('should throw BadRequestException if no rows are affected', async () => {
      const id = 1;
      const deleteLeave: DeleteResult = {
        affected: 0,
        raw: undefined,
      };
      jest.spyOn(mockLeaveService, 'delete').mockResolvedValue(deleteLeave);
      await expect(service.deleteLeave(id)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockLeaveService.delete).toHaveBeenCalledWith(id);
    });
  });

  it('should update leave successfully', async () => {
    const leaveId = 1;
    const updateLeaveDto: UpdateLeaveDto = {
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-10-10'),
      reason: 'Medical leave',
      leaveType: 'SICK',
    };

    const updatedLeave = {
      ...updateLeaveDto,
      id: leaveId,
    };

    mockLeaveService.findOne.mockResolvedValue(updatedLeave);
    mockLeaveService.update.mockResolvedValue(undefined);

    const result = await service.updateLeave(leaveId, updateLeaveDto);

    expect(mockLeaveService.findOne).toHaveBeenCalledWith({
      where: { id: leaveId },
    });
    expect(mockLeaveService.update).toHaveBeenCalledWith(
      leaveId,
      updateLeaveDto,
    );
    expect(result).toEqual({
      Success: true,
      Updated_user: updatedLeave,
    });
  });

  it('should throw NotFoundException if leave not found', async () => {
    const leaveId = 999;
    const updateLeaveDto: UpdateLeaveDto = {
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-10-10'),
      reason: 'Vacation',
      leaveType: 'CASUAL',
    };

    mockLeaveService.findOne.mockResolvedValue(null);

    await expect(service.updateLeave(leaveId, updateLeaveDto)).rejects.toThrow(
      new NotFoundException(`No Leave Request in this ${leaveId}th ID`),
    );

    expect(mockLeaveService.findOne).toHaveBeenCalledWith({
      where: { id: leaveId },
    });
    expect(mockLeaveService.update).not.toHaveBeenCalled();
  });
});
