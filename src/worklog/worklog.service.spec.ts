import { Test, TestingModule } from '@nestjs/testing';
import { WorklogService } from './worklog.service';
import { WorkLog } from './worklog.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { CreateWorkLogDto } from './worklog.dto';
import { BadRequestException } from '@nestjs/common';
const mockService = {
  save: jest.fn(),
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
