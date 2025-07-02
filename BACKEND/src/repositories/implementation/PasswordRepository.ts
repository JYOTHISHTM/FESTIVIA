import User from '../../models/User';
import { IPasswordRepository } from '../interface/IPasswordRepository';

export class PasswordRepository implements IPasswordRepository {
  async findUserById(userId: string) {
    return await User.findById(userId);
  }

  async updatePassword(userId: string, hashedPassword: string) {
    return await User.findByIdAndUpdate(userId, { password: hashedPassword });
  }
}
