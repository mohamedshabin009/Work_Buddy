import { Test, TestingModule } from '@nestjs/testing';
import { WorklogService } from './worklog.service';
import { WorkLog } from './worklog.entity';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { CreateWorkLogDto, UpdateWorkLogDto } from './worklog.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
const mockService = {
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};
const userMockService = {
  getById: jest.fn(),
};
describe('WorklogService', () => {
  let service: WorklogService;
  let worklogRepository: Repository<WorkLog>;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorklogService,
        {
          provide: getRepositoryToken(WorkLog),
          useValue: mockService,
        },
        {
          provide: UserService,
          useValue: userMockService,
        },
      ],
    }).compile();

    service = module.get<WorklogService>(WorklogService);
    worklogRepository = module.get<Repository<WorkLog>>(
      getRepositoryToken(WorkLog),
    );
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a work log successfully', async () => {
      const createWorkLogDto: CreateWorkLogDto = {
        date: '2024-10-28',
        clockEvent: [
          {
            clock_in_time: '2024-10-28',
            clock_out_time: '2024-10-28T18:30:00.000Z',
          },
        ],
      } as any;
      const userId = 1;
      const userMock = { id: userId, name: 'Test User' } as any;

      const savedWorkLog = { id: 1, ...createWorkLogDto, user: userMock };
      jest.spyOn(userService, 'getById').mockResolvedValue(userMock);
      jest.spyOn(worklogRepository, 'save').mockResolvedValue(savedWorkLog);
      const result = await service.createWorkLog(createWorkLogDto, userId);
      expect(userService.getById).toHaveBeenCalledWith(userId);
      expect(worklogRepository.save).toHaveBeenCalledWith({
        ...createWorkLogDto,
        user: userMock,
      });
      expect(result).toEqual(savedWorkLog);
    });

    it('should throw BadRequestException if save fails', async () => {
      const createWorkLogDto: CreateWorkLogDto = {
        date: '2024-10-28',
        clockEvent: [
          {
            clock_in_time: '2024-10-28',
            clock_out_time: '2024-10-28T18:30:00.000Z',
          },
        ],
      } as any;
      const userId = 1;
      const userMock = { id: userId, name: 'Test User' } as any;

      jest.spyOn(userService, 'getById').mockResolvedValue(userMock);
      jest
        .spyOn(worklogRepository, 'save')
        .mockRejectedValue(new Error('Save failed'));
      await expect(
        service.createWorkLog(createWorkLogDto, userId),
      ).rejects.toThrow(BadRequestException);
      expect(userService.getById).toHaveBeenCalledWith(userId);
      expect(worklogRepository.save).toHaveBeenCalledWith({
        ...createWorkLogDto,
        user: userMock,
      });
    });
  });
  describe('get all', () => {
    it("should find work Log and return it's all data", async () => {
      const mockWorkLog = {
        id: 33,
        date: '2024-10-27T18:30:00.000Z',
        clockEvent: [
          {
            clock_in_time: '2024-10-28T09:30:00.000Z',
            clock_out_time: '2024-10-28T18:30:00.000Z',
          },
        ],
        user: {
          id: 6,
          name: 'kane',
          password: 'kane@123',
          role: 'EMPLOYEE',
          email: 'kane@gmail.com',
          mobileNumber: '+919876511003',
          profileImage: 'cric.png',
        },
      };
      mockService.find.mockReturnValue([mockWorkLog]);
      await service.getAll();
      expect(mockService.find).toHaveBeenCalledWith();
    });

    it('should bad Req if not', async () => {
      mockService.find.mockResolvedValue(null);
      await expect(service.getAll).rejects.toThrow(BadRequestException);
    });
  });

  it('should Bad Req if not retrieve work log by Id', async () => {
    const leaveId = 32;
    mockService.findOne.mockReturnValue(null);
    await expect(service.getWorkLogId(leaveId)).rejects.toThrow(
      BadRequestException,
    );
  });
  describe('User By Id', () => {
    it('should give work log User By Id', async () => {
      const userId = 33;
      const workLog = {
        date: '2024-10-28',
        clockEvent: [
          {
            clock_in_time: '2024-10-28',
            clock_out_time: '2024-10-28T18:30:00.000Z',
          },
        ],
      };
      mockService.find.mockReturnValue(workLog);
      await service.getWorkLogsByUserId(userId);
      expect(mockService.find).toHaveBeenLastCalledWith({
        where: { user: { id: userId } },
        relations: ['user'],
      });
    });
    it('should give work log User By Id', async () => {
      const userId = 2;
      mockService.find.mockResolvedValue(null);
      await expect(service.getWorkLogsByUserId(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  it('should update a work log successfully', async () => {
    const updateWorkLogDto: UpdateWorkLogDto = {
      clockEvent: [
        {
          clock_in_time: '2024-10-29',
          clock_out_time: '2024-10-29T18:30:00.000Z',
        },
      ],
    } as any;

    const workLogId = 1;
    const existingWorkLog = {
      id: workLogId,
      date: '2024-10-28',
      clockEvent: [
        {
          clock_in_time: '2024-10-28',
          clock_out_time: '2024-10-28T18:30:00.000Z',
        },
      ],
      user: { id: 1, name: 'Test User' },
    } as any;

    const updatedWorkLog = { ...existingWorkLog, ...updateWorkLogDto };

    // Mock repository methods
    jest.spyOn(worklogRepository, 'findOne').mockResolvedValue(existingWorkLog);
    jest.spyOn(worklogRepository, 'update').mockResolvedValue(undefined);
    jest.spyOn(worklogRepository, 'findOne').mockResolvedValue(updatedWorkLog);

    const result = await service.updateWorkLog(workLogId, updateWorkLogDto);

    // Assert that findOne and update were called correctly
    expect(worklogRepository.findOne).toHaveBeenCalledWith({
      where: { id: workLogId },
    });
    expect(worklogRepository.update).toHaveBeenCalledWith(
      workLogId,
      updateWorkLogDto,
    );
    expect(result).toEqual({
      success: true,
      workLog: updatedWorkLog,
    });
  });

  it('should throw NotFoundException if work log is not found', async () => {
    const updateWorkLogDto: UpdateWorkLogDto = {
      clockEvent: [
        {
          clock_in_time: '2024-10-29',
          clock_out_time: '2024-10-29T18:30:00.000Z',
        },
      ],
    } as any;

    const workLogId = 1;

    // Mock repository methods
    jest.spyOn(worklogRepository, 'findOne').mockResolvedValue(null);

    // Run the update function and expect a NotFoundException
    await expect(
      service.updateWorkLog(workLogId, updateWorkLogDto),
    ).rejects.toThrow(
      new NotFoundException(`No WorkLog in this ${workLogId} ID`),
    );
  });
  describe('delete', () => {
    it('should delete the data', async () => {
      const workLogId = 39;
      const deleteResult: DeleteResult = {
        affected: 1,
        raw: undefined,
      }; // Mocking the expected delete result

      // Mock the delete method of the repository to return the delete result
      jest.spyOn(worklogRepository, 'delete').mockResolvedValue(deleteResult);

      // Call the deleteWorkLog method
      const result = await service.deleteWorkLog(workLogId);

      // Check that the delete method was called with the correct ID
      expect(worklogRepository.delete).toHaveBeenCalledWith(workLogId);

      // Check that the result is as expected
      expect(result).toEqual(deleteResult);
    });

    it('should throw BadRequestException if no rows are affected', async () => {
      const workLogId = 39;
      const deleteResult: DeleteResult = {
        affected: 0,
        raw: undefined,
      }; // Simulate no rows affected

      jest.spyOn(worklogRepository, 'delete').mockResolvedValue(deleteResult);

      await expect(service.deleteWorkLog(workLogId)).rejects.toThrow(
        BadRequestException,
      );
      expect(worklogRepository.delete).toHaveBeenCalledWith(workLogId);
    });
  });
});
