import { Request, Response } from 'express';
import { SeatLayoutService } from '../../services/implementation/SeatLayoutService';
import { StatusCodes } from "../../enums/StatusCodes";
import { ISeatLayoutController } from '../interface/ISeatLayoutController';

export class SeatLayoutController implements ISeatLayoutController {
  constructor(private service: SeatLayoutService) {}

  public async createLayout(req: Request, res: Response): Promise<void> {
    try {
      const { layoutType, totalSeats, price } = req.body;
      const { creatorId } = req.params;

      if (!creatorId) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'creatorId is required in URL params' });
        return;
      }

      if (!layoutType || !totalSeats) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'layoutType and totalSeats are required in body' });
        return;
      }

      let normalPrice: number | undefined;
      let balconyPrices: { normal: number; premium: number } | undefined;
      let reclanarPrices: { reclanar: number; reclanarPlus: number } | undefined;

      switch (layoutType) {
        case 'normal':
        case 'centeredscreen':
          if (typeof price !== 'number') {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'price must be a number for this layoutType' });
            return;
          }
          normalPrice = price;
          break;

        case 'withbalcony':
          if (
            !price ||
            typeof price.normal !== 'number' ||
            typeof price.premium !== 'number'
          ) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'price with normal and premium numbers is required' });
            return;
          }
          balconyPrices = price;
          break;

        case 'reclanar':
          if (
            !price ||
            typeof price.reclanar !== 'number' ||
            typeof price.reclanarPlus !== 'number'
          ) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'price with reclanar and reclanarPlus numbers is required' });
            return;
          }
          reclanarPrices = price;
          break;

        default:
          res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid layoutType' });
          return;
      }

      const layoutData = {
        layoutType,
        totalSeats,
        creatorId,
        isUsed: false,
        normalPrice,
        balconyPrices,
        reclanarPrices,
        seats: [],
      };

      const layout = await this.service.createLayout(layoutData);
      res.status(StatusCodes.CREATED).json(layout);
    } catch (err) {
      console.error('Error saving layout:', err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to save layout', error: err });
    }
  }

  public async getLayouts(_: Request, res: Response): Promise<void> {
    try {
      const layouts = await this.service.getAllLayouts();
      res.status(StatusCodes.OK).json(layouts);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to retrieve layouts', error: err });
    }
  }

  public async getLayoutsByCreatorId(req: Request, res: Response): Promise<void> {
    try {
      const { creatorId } = req.params;
      const layouts = await this.service.getLayoutsByCreatorId(creatorId);
      res.status(StatusCodes.OK).json(layouts);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to retrieve layouts', error: err });
    }
  }
}
