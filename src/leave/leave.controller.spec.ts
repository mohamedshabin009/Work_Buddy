import { Test, TestingModule } from '@nestjs/testing';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';

const mockService = {
  createLeave: jest.fn(),
  getAllLeave: jest.fn(),
  getLeaveById: jest.fn(),
  getLeaveRequestsByUserId: jest.fn(),
  updateLeave: jest.fn(),
  deleteLeave: jest.fn(),
};

describe('LeaveController', () => {
  let controller: LeaveController;
  let leaveService: LeaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveController],
      providers: [
        {
          provide: LeaveService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<LeaveController>(LeaveController);
    leaveService = module.get<LeaveService>(LeaveService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createLeave', () => {
    it('should create new data', async () => {
      const user = 9;
      const mockService = {
        startDate: '2024-10-28',
        endDate: '2024-10-29',
        reason: 'I should go to Passport office',
        leaveType: 'CASUAL',
        status: 'APPROVED',
      } as any;
      await controller.createLeave(mockService, user);
    });
  });
  describe('getAllLeave', () => {
    it('should return all leave', async () => {
      await controller.getAllLeave();
      expect(leaveService.getAllLeave).toHaveBeenCalledWith();
    });
  });
  describe('getLeaveById', () => {
    it('should return specified leave', async () => {
      const leave = 33;
      await controller.getLeaveById({ id: leave });
      expect(leaveService.getLeaveById).toHaveBeenCalledWith(leave);
    });
  });
  describe('getLeaveRequestsByUserId', () => {
    it('should return leave with user', async () => {
      const user = 10;
      await controller.getLeaveRequestsByUserId({ userId: user });
      expect(leaveService.getLeaveRequestsByUserId).toHaveBeenCalledWith(user);
    });
  });
  describe('updateReq', () => {
    it('should Update data', async () => {
      const user = 34;
      const updateLeave = {
        startDate: '2024-10-11',

        endDate: '2024-10-14',

        reason: 'Viral Fever',

        leaveType: 'SICK',
      } as any;
      await controller.updateLeave(user, updateLeave);
      expect(leaveService.updateLeave).toHaveBeenCalledWith(user, updateLeave);
    });
  });
  describe('delete', () => {
    it('should delete the data', async () => {
      const user = 10;
      await controller.deleteLeave(user);
      expect(leaveService.deleteLeave).toHaveBeenCalledWith(user);
    });
  });
});
