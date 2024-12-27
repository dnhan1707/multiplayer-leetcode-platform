import { Request, Response, Router } from "express";

const router = Router();

// ================== ROOM API Routes ==================

router.post("/room/:size", async (req: Request, res: Response) => {
  try {
    const { creatorId } = req.body;
    const { size } = req.params;
    // Validate size here if needed
    res.status(201).json({ message: `Room created with number of players: ${size}` });
  } catch (err) {
    res.status(500).json({ message: "Failed to create room", error: err });
  }
});


router.post("/room/:id/join", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    // Add user to room in database here
    res.status(200).json({ message: `User ${userId} joined room ${id}` });
  } catch (err) {
    res.status(500).json({ message: "Failed to join room", error: err });
  }
});


router.get("/room/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Fetch room details from database here
    res.status(200).json({ message: "Room details", roomId: id });
  } catch (err) {
    res.status(500).json({ message: "Failed to get room details", error: err });
  }
});


router.get("/room", async (req: Request, res: Response) => {
  try {
    // Fetch all rooms from database here
    res.status(200).json({ message: "All rooms" });
  } catch (err) {
    res.status(500).json({ message: "Failed to get rooms", error: err });
  }
});


router.delete("/room/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Remove room from database here
    res.status(200).json({ message: "Room removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove room", error: err });
  }
});


router.put("/room/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, size } = req.body;
    // Update room status in database here
    res.status(200).json({ message: `Room status updated to ${status}` });
    res.status(200).json({ message: `Room size updated to ${size}` });
  } catch (err) {
    res.status(500).json({ message: "Failed to update room", error: err });
  }
});


// update user name in room
router.put("/room/:id/:socketid/:newName", async (req: Request, res: Response) => {
  try {
    const { id, socketid, newName } = req.params;
    res.status(200).json({ message: `Room user ${socketid} updated to ${newName}` });
  } catch (err) {
    res.status(500).json({ message: "Failed to update room", error: err });
  }
});

export const apiRoutes = router;