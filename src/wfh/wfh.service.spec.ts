import { Test, TestingModule } from '@nestjs/testing';
import { WfhService } from './wfh.service';
import { Any, DeleteResult, Repository } from 'typeorm';
import { Wfh } from './wfh.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateWfhDto, UpdateWfhDto } from './wfh.dto';
describe('WfhService', () => {
  let service: WfhService;
  let mockRepository: Repository<Wfh>;

  const mockWfhService = {
    delete: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  const mockUserService = {
    getById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WfhService,
        {
          provide: getRepositoryToken(Wfh),
          useValue: mockWfhService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<WfhService>(WfhService);
    mockRepository = module.get<Repository<Wfh>>(getRepositoryToken(Wfh));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create work from home', async () => {
    const userId = 3;
    const userMock = {
      id: 2,
      name: 'Athil',
      password: 'Athil@123',
      role: 'EMPLOYEE',
      email: 'athilj@gmail.com',
      mobileNumber: '+919876511003',
      profileImage: 'gk.png',
    };
    const createMockWfh: CreateWfhDto = {
      startDate: new Date('2024-10-28'),
      endDate: new Date('2024-11-30'),
      reason: 'Hamstring Injury',
      status: 'Reject',
      created_on: new Date('00:47:17.459328'),
    };
    const saveMockWfh = { id: 2, ...createMockWfh, user: userMock };
    mockUserService.getById.mockReturnValue(userMock);
    mockWfhService.save.mockReturnValue(saveMockWfh);
    await service.createWorkFromHome(createMockWfh, userId);
    expect(mockUserService.getById).toHaveBeenCalledWith(userId);
    expect(mockWfhService.save).toHaveBeenCalledWith({
      ...createMockWfh,
      user: userMock,
    });
  });

  it('should BadRequestException if not create a Work from home', async () => {
    mockUserService.getById.mockResolvedValueOnce(null);
    await expect(service.createWorkFromHome).rejects.toThrow(
      BadRequestException,
    );
  });
  describe('get all work from home', () => {
    it('should give all Work From Home', async () => {
      mockWfhService.find.mockReturnValue([]);
      await service.getAllWorkFromHome();
      expect(mockWfhService.find).toHaveBeenCalledWith({ relations: ['user'] });
    });

    it('should bad request  if not give all Work From Home', async () => {
      mockWfhService.find.mockResolvedValue(null);
      await expect(service.getAllWorkFromHome).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  it('should give Work From Home by Id', async () => {
    const wfhId = 2;
    const mockWfh = {
      id: 2,
      startDate: '2024-10-27T18:30:00.000Z',
      endDate: '2024-11-05T18:30:00.000Z',
      reason: 'Due to little accident',
      status: 'APPROVED',
      created_on: '15:15:54.306728',
    };
    mockWfhService.findOne.mockReturnValue(mockWfh);
    await service.getWorkFromHomeById(wfhId);
    expect(mockWfhService.findOne).toHaveBeenCalledWith({
      where: { id: wfhId },
      relations: ['user'],
    });
  });

  it('should give Work From Home by Id', async () => {
    const wfhId = 1;
    mockWfhService.findOne.mockReturnValue(null);
    await expect(service.getWorkFromHomeById(wfhId)).rejects.toThrow(
      BadRequestException,
    );
  });
  describe('get by user id', () => {
    it('should give work from home by User Id', async () => {
      const userId = 100;
      const mockWfh = {
        id: 11,
        startDate: '2024-10-27T18:30:00.000Z',
        endDate: '2024-11-29T18:30:00.000Z',
        reason: 'Hamstring Injury',
        status: 'PENDING',
        created_on: '16:02:55.109442',
        user: {
          id: 9,
          name: 'Messi',
          password: 'messi@123',
          role: 'MANAGER',
          email: 'messi@gmail.com',
          mobileNumber: '+919876101010',
          profileImage: 'm10.png',
        },
      };
      mockWfhService.find.mockReturnValue(mockWfh);
      await service.getWfhByUserId(userId);
      expect(mockWfhService.find).toHaveBeenLastCalledWith({
        where: { user: { id: userId } },
        relations: ['user'],
      });
    });
    it('should  BadRequestException if not give work from home by User Id', async () => {
      const userId = 2;
      mockWfhService.find.mockResolvedValue(null);
      await expect(service.getWfhByUserId(userId)).rejects.toThrow(
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
      jest.spyOn(mockWfhService, 'delete').mockResolvedValue(deleteLeave);
      const result = await service.deleteWorkFromHome(id);
      expect(mockWfhService.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(deleteLeave);
    });

    it('should throw BadRequestException if no rows are affected', async () => {
      const id = 1;
      const deleteLeave: DeleteResult = {
        affected: 0,
        raw: undefined,
      };
      jest.spyOn(mockWfhService, 'delete').mockResolvedValue(deleteLeave);
      await expect(service.deleteWorkFromHome(id)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockWfhService.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update work-from-home request successfully', async () => {
      const wfhId = 1;
      const updateWfhDto: UpdateWfhDto = {
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-11-10'),
        reason: 'Family obligations',
      };

      const updatedWfh = {
        ...updateWfhDto,
        id: wfhId,
      };

      mockWfhService.findOne.mockResolvedValue(updatedWfh);
      mockWfhService.update.mockResolvedValue(undefined);

      const result = await service.updateWorkFromHome(wfhId, updateWfhDto);

      expect(mockWfhService.findOne).toHaveBeenCalledWith({
        where: { id: wfhId },
      });
      expect(mockWfhService.update).toHaveBeenCalledWith(wfhId, updateWfhDto);
      expect(result).toEqual({
        Success: true,
        workFromHomeUpdated: updatedWfh,
      });
    });

    it('should throw NotFoundException if WFH request not found', async () => {
      const wfhId = 999;
      const updateWfhDto: UpdateWfhDto = {
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-11-10'),
        reason: 'Medical reasons',
      };

      mockWfhService.findOne.mockResolvedValue(null);

      await expect(
        service.updateWorkFromHome(wfhId, updateWfhDto),
      ).rejects.toThrow(
        new NotFoundException(`No WFH Request in this ${wfhId} ID`),
      );

      expect(mockWfhService.findOne).toHaveBeenCalledWith({
        where: { id: wfhId },
      });
      expect(mockWfhService.update).not.toHaveBeenCalled();
    });
  });
});
