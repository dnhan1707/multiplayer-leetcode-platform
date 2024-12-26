import { Request, Response, Router } from "express";

const router = Router();

router.get("/health", (_, res: Response) => {
  res.json({ status: "ok" });
});

export const apiRoutes = router;
