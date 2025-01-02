import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  constructor(private userService: UserService) {}

  createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err: unknown) {
      console.error("Create user error:", err);
      res.status(500).json({ error: "Failed to create user" });
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getUsers();
      res.json(users);
    } catch (err: unknown) {
      console.error("Get users error:", err);
      res.status(500).json({ error: "Failed to get users" });
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (err: unknown) {
      console.error("Get user error:", err);
      res.status(500).json({ error: "Failed to get user" });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { affectedCount, affectedRows } = await this.userService.updateUser(
        req.params.id,
        req.body
      );

      if (affectedCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(affectedRows[0]);
    } catch (err: unknown) {
      console.error("Update user error:", err);
      res.status(500).json({ error: "Failed to update user" });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const deleted = await this.userService.deleteUser(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(204).send();
    } catch (err: unknown) {
      console.error("Delete user error:", err);
      res.status(500).json({ error: "Failed to delete user" });
    }
  };
}
