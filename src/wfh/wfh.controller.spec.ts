import { Test, TestingModule } from '@nestjs/testing';
import { WfhController } from './wfh.controller';
import { WfhService } from './wfh.service';
const mockService = {
  createWorkFromHome: jest.fn(),
  getAllWorkFromHome: jest.fn(),
  getWorkFromHomeById: jest.fn(),
  getWfhByUserId: jest.fn(),
  updateWorkFromHome: jest.fn(),
  deleteWorkFromHome: jest.fn(),
};
describe('WfhController', () => {
  let controller: WfhController;
  let wfhService: WfhService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WfhController],
      providers: [
        {
          provide: WfhService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<WfhController>(WfhController);
    wfhService = module.get<WfhService>(WfhService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create new data', async () => {
      const mockWfh = {
        startDate: '2024-10-28',
        endDate: '2024-11-30',
        reason: 'Hamstring Injury',
        status: 'Reject',
        created_on: '00:47:17.459328',
      } as any;
      await controller.createWorkFromHome(mockWfh, 7);
      expect(wfhService.createWorkFromHome).toHaveBeenCalledWith(mockWfh, 7);
    });
  });

  describe('getAllWFH', () => {
    it('should return all data', async () => {
      await controller.getAllWorkFromHome();
      expect(wfhService.getAllWorkFromHome).toHaveBeenCalledWith();
    });
  });
  describe('getWFHById', () => {
    it('should return specified data', async () => {
      await controller.getWorkFromHomeById({ id: 2 });
      expect(wfhService.getWorkFromHomeById).toHaveBeenCalledWith(2);
    });
  });
  describe('getWfhByUserId', () => {
    it('should return data with user', async () => {
      await controller.getWfhByUserId({ userId: 2 });
      expect(wfhService.getWfhByUserId).toHaveBeenCalledWith(2);
    });
  });
  describe('update/WFH', () => {
    it('should return Updated data', async () => {
      const wfh = {
        reason: 'Knee Pain, I can able to walk so..',
      };
      await controller.updateWorkFromHome(2, wfh);
      expect(wfhService.updateWorkFromHome).toHaveBeenCalledWith(2, wfh);
    });
  });
  describe('delete', () => {
    it('should delete specified data', async () => {
      await controller.deleteWorkFromHome(2);
      expect(wfhService.deleteWorkFromHome).toHaveBeenCalledWith(2);
    });
  });
});
