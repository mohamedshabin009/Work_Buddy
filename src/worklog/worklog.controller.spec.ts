import { Test, TestingModule } from '@nestjs/testing';
import { WorklogController } from './worklog.controller';
import { WorklogService } from './worklog.service';
import { WorkLog } from './worklog.entity';
const mockservice = {
  createWorkLog: jest.fn(),
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
          useValue: mockservice,
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
});
