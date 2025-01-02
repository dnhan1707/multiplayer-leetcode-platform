import { User } from "../models/user";
import jwt from "jsonwebtoken";

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

  async signUp(data: Pick<User, "username" | "email" | "password">) {
    const user = await this.createUser(data);
    const token = this.generateToken(user);
    return { user, token };
  }

  async logIn(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if(!user || !(await user.validatePassword(password))) {
      throw new Error("Invalid email or password");
    }
    const token = this.generateToken(user);
    return { user, token };
  }
  
  generateToken(user: User) {
    return jwt.sign({
      id: user.id,
    }, process.env.JWT_SECRET || "tempsecretkey", 
    {
      expiresIn: "1h"
    })
  }
}
