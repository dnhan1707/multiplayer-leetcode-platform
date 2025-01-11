import { User } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class UserService {
  async createUser(data: Pick<User, "username" | "email" | "password">) {
    data.password = await bcrypt.hash(data.password, 10);
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
    try {
      const existingUser = await User.findOne({ where: { email: data.email } });
      if (existingUser) {
        throw new Error("Email already in use");
      }
      // if (data.password.length < 8) {
      //   throw new Error("Password must be at least 8 characters long");
      // }
      const user = await this.createUser(data);
      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong. Please try again later.");
    }
  }

  async logIn(email: string, password: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("Invalid credentials");
  
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) throw new Error("Invalid credentials");
  
      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong. Please try again later.");
    }
  }
  

  generateToken(user: User) {
    return jwt.sign({
      id: user.id,
    }, process.env.JWT_SECRET || "tempsecretkey", 
    {
      expiresIn: process.env.EXP_JWT
    })
  }
}
