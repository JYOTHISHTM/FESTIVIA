import { Request, Response } from "express";
import dotenv from "dotenv";
import { IAdminController } from "../../controllers/interface/IAdminController";
import { IAdminService } from "../../services/interface/IAdminService";
import { StatusCodes, Messages } from "../../enums/StatusCodes";
dotenv.config();

class AdminController implements IAdminController {
  private _adminService: IAdminService;

  constructor(adminService: IAdminService) {
    this._adminService = adminService;
  }



  async getDashboardData(req: Request, res: Response): Promise<void> {
    try {
      const data = await this._adminService.getDashboardData();
      res.json(data);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: Messages.INTERNAL_SERVER_ERROR });
    }
  }



  async reapplyCreator(req: Request, res: Response): Promise<void> {
    try {
      const creatorId = req.params.id;

      const result = await this._adminService.handleCreatorReapply(creatorId);

      if (!result) {
        res.status(StatusCodes.NOT_FOUND).json({ message: Messages.CREATOR_NOT_FOUND });
      }

      res.status(StatusCodes.OK).json({ message: Messages.REAPPLIED_SUCCESSFULLY, creator: result });
    } catch (err) {
      console.error('Controller Error:', err);
      res.status(500).json({ message: Messages.INTERNAL_SERVER_ERROR });
    }
  }

  async getSubscriptionPlan(req: Request, res: Response): Promise<Response> {
    try {
      const plan = await this._adminService.getSubscriptionPlan();
      return res.status(StatusCodes.OK).json(plan);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: Messages.ERROR_FETCHING_SUBSCRIPTION_PLAN });
    }
  }

  async deleteSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this._adminService.deleteSubscription(id);
      res.status(200).json({ message: Messages.SUBSCRIPTION_DELETED_SUCCESSFULLY });
    } catch (error) {
      res.status(500).json({ message: Messages.FAILED_TO_DELETE_SUBSCRIPTION });
    }
  };


  async createSubscription(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!data.name || !data.price || !data.days) {
        return res.status(400).json({ message: Messages.MISSING_REQUIRED_FIELDS });
      }
      const created = await this._adminService.createSubscription(data);
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ message: Messages.INTERNAL_SERVER_ERROR, err });
    }
  }

  async getPendingCreators(req: Request, res: Response) {
    try {
      const pendingCreators = await this._adminService.getPendingCreators();
      return res.status(StatusCodes.OK).json(pendingCreators);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: Messages.FETCH_PENDING_CREATORS_ERROR, error });
    }
  }

  async approveCreator(req: Request, res: Response) {
    try {
      const { creatorId } = req.params;

      const creator = await this._adminService.approveCreator(creatorId);

      if (!creator) return res.status(StatusCodes.NOT_FOUND).json({ message: Messages.CREATOR_NOT_FOUND });

      return res.status(StatusCodes.OK).json({
        message: Messages.CREATOR_APPROVED_SUCCESSFULLY,
        creator,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: Messages.ERROR_APPROVING_CREATOR, error });
    }
  }







  async rejectCreator(req: Request, res: Response) {
    try {
      const { creatorId } = req.params;
      const { rejectionReason } = req.body;

      if (!rejectionReason) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: Messages.REJECTION_REASON_IS_REQUIRED });
      }

      const creator = await this._adminService.rejectCreator(creatorId, rejectionReason);

      if (!creator) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: Messages.CREATOR_NOT_FOUND });
      }

      return res.status(StatusCodes.OK).json({
        message:Messages.CREATOR_REJECTED_SUCCESSFULLY,
        creator
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: Messages.ERROR_REJECTING_CREATOR, error });
    }
  }

  async getCreatorStatus(req: Request, res: Response) {
    try {

      const { creatorId } = req.params;

      const creator = await this._adminService.getCreatorStatus(creatorId);

      if (!creator) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: Messages.CREATOR_NOT_FOUND });
      }

      return res.status(StatusCodes.OK).json({
        status: creator.status,
        rejectionReason: creator.rejectionReason || null,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: Messages.ERROR_FETCHING_CREATOR_STATUS });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;
      const { token, refreshToken, admin } = await this._adminService.login(username, password);

      res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });

      return res.status(StatusCodes.OK).json({
        message:Messages.LOGIN_SUCCESSFUL,
        isAdmin: true,
        token,
        admin: { id: admin._id, username: admin.username }
      });

    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: (error as Error).message });
    }
  }


  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const newAccessToken = await this._adminService.refreshToken(refreshToken);

      if (!newAccessToken) {
        res.clearCookie("refreshToken");
        return res.status(StatusCodes.FORBIDDEN).json({ error: "Invalid or expired refresh token" });
      }

      res.json({ token: newAccessToken });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error:Messages.INTERNAL_SERVER_ERROR });
    }
  }


  async logout(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.cookies;

      await this._adminService.logout(refreshToken);

      res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "strict" });

      res.status(StatusCodes.OK).json({ message:Messages.LOGGED_OUT_SUCCESSFULLY });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: Messages.INTERNAL_SERVER_ERROR});
    }
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this._adminService.getUsers();
      return res.status(StatusCodes.OK).json(users);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: Messages.ERROR_REJECTING_USERS,
        error,
      });
    }
  }


  async getCreators(req: Request, res: Response): Promise<Response> {
    try {
      const creators = await this._adminService.getCreators();
      return res.status(StatusCodes.OK).json(creators);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:Messages.ERROR_FETCHING_CREATORS,
        error,
      });
    }
  }

  async blockUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const user = await this._adminService.blockUser(userId);

      if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message:Messages.USER_NOT_FOUND });

      return res.status(StatusCodes.OK).json({
        message: user.isBlocked ? Messages.USER_BLOCKED_SUCCESSFULLY : Messages.USER_UNBLOCKED_SUCCESSFULLY,
        user
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message:Messages.ERROR_UPDATING_USER_STATUS, error });
    }
  }

  async blockCreator(req: Request, res: Response): Promise<Response> {
    try {
      const { creatorId } = req.params;
      const creator = await this._adminService.blockCreator(creatorId);

      if (!creator) return res.status(StatusCodes.NOT_FOUND).json({ message: Messages.CREATOR_NOT_FOUND });

      return res.status(StatusCodes.OK).json({
        message: creator.isBlocked ? Messages.CREATOR_BLOCKED_SUCCESSFULLY :Messages.CREATOR_UNBLOCKED_SUCCESSFULLY ,
        creator
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: Messages.ERROR_UPDATING_CREATOR_STATUS, error });
    }
  }

}

export default AdminController;
