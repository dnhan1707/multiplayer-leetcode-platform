import { User } from "../models/user";

export class UserService {
  async createUser(data: Pick<User, "username" | "email" | "password">) {
    return User.create(data);
  }

  async getUserById(id: string) {
    return User.findByPk(id);
  }

  async getUsers() {
    return User.findAll();
  }

  async updateUser(
    id: string,
    data: Partial<Pick<User, "username" | "email" | "password">>
  ) {
    const [affectedCount, affectedRows] = await User.update(data, {
      where: { id },
      returning: true,
    });
    return { affectedCount, affectedRows };
  }

  async deleteUser(id: string) {
    return User.destroy({
      where: { id },
    });
  }
}
