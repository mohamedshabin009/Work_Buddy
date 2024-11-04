import { Test, TestingModule } from '@nestjs/testing';
import { WorklogController } from './worklog.controller';
import { WorklogService } from './worklog.service';
const mockService = {
  createWorkLog: jest.fn(),
  getAll: jest.fn(),
  getWorkLogId: jest.fn(),
  getWorkLogsByUserId: jest.fn(),
  updateWorkLog: jest.fn(),
  deleteWorkLog: jest.fn(),
};
describe('WorklogController', () => {
  let controller: WorklogController;
  let worklogService: WorklogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorklogController],
      providers: [
        {
          provide: WorklogService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<WorklogController>(WorklogController);
    worklogService = module.get<WorklogService>(WorklogService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createWorkLog', () => {
    it('should create new data', async () => {
      const mockWorklog = {
        date: '2024-10-28',
        clockEvent: [
          {
            clock_in_time: '2024-10-28',
            clock_out_time: '2024-10-28T18:30:00.000Z',
          },
        ],
      } as any;
      await controller.createWorkLog(mockWorklog, 7);
      expect(worklogService.createWorkLog).toHaveBeenCalledWith(mockWorklog, 7);
    });
  });
  describe('getAllWorkLog', () => {
    it('should return all work logs', async () => {
      await controller.getAllWorkLog();
      expect(worklogService.getAll).toHaveBeenCalledWith();
    });
  });

  describe('getWorkLogById', () => {
    it('should return workLog id', async () => {
      const workLogId = 39;
      await controller.getWorkLogById({ id: workLogId });
      expect(worklogService.getWorkLogId).toHaveBeenCalledWith(workLogId);
    });
  });

  describe('getWorkLogsByUserId', () => {
    it('should return workLog Id with user Id', async () => {
      const userId = 2;
      await controller.getWorkLogsByUserId({ id: userId });
      expect(worklogService.getWorkLogsByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('update', () => {
    it('should return Updated value', async () => {
      const updateUser = {
        clockEvent: [
          {
            clock_in_time: '2024-10-28',
            clock_out_time: '2024-10-28T18:30:00.000Z',
          },
        ],
      } as any;
      await controller.updateWorkLog(39, updateUser);
      expect(worklogService.updateWorkLog).toHaveBeenCalledWith(39, updateUser);
    });
  });

  describe('delete', () => {
    it('should delete data', async () => {
      await controller.deleteWorkLog(39);
      expect(worklogService.deleteWorkLog).toHaveBeenCalledWith(39);
    });
  });
});
