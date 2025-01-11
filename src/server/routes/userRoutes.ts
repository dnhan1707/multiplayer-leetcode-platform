import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export const userRoutes = router;
