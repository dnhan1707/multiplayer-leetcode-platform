import { Router } from "express";
import { UserController } from "../../controllers";
import { UserService } from "../../services";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post("/", (req, res) => userController.createUser(req, res));
router.get("/:id", (req, res) => userController.getUser(req, res));
router.put("/:id", (req, res) => userController.updateUser(req, res));
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

export const userRoutes = router;
