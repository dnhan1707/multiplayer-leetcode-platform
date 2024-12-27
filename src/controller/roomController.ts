import { Request, Response } from "express";

export const generateRoom = async (req: Request, res: Response) => {
  try {
    const { size } = req.params;
    // Generate room in database here
    res.status(201).json({ message: `Room created with number of players: ${size}` });
  } catch (err) {
    res.status(500).json({ message: "Failed to create room", error: err });
  }
};

export const joinRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    // Add user to room in database here
    res.status(200).json({ message: `User ${userId} joined room ${id}` });
  } catch (err) {
    res.status(500).json({ message: "Failed to join room", error: err });
  }
};

export const getRoomDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Fetch room details from database here
    res.status(200).json({ message: "Room details", roomId: id });
  } catch (err) {
    res.status(500).json({ message: "Failed to get room details", error: err });
  }
};

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    // Fetch all rooms from database here
    res.status(200).json({ message: "All rooms" });
  } catch (err) {
    res.status(500).json({ message: "Failed to get rooms", error: err });
  }
};

export const removeRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Remove room from database here
    res.status(200).json({ message: "Room removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove room", error: err });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, size } = req.body;
    // Update room status and size in database here
    res.status(200).json({ message: `Room status updated to ${status}` });
    res.status(200).json({ message: `Room size updated to ${size}` });
  } catch (err) {
    res.status(500).json({ message: "Failed to update room", error: err });
  }
};

export const updateUserNameInRoom = async (req: Request, res: Response) => {
  try {
    const { id, socketid, newName } = req.params;
    // Update user name in room in database here
    res.status(200).json({ message: `Room user ${socketid} updated to ${newName}` });
  } catch (err) {
    res.status(500).json({ message: "Failed to update room", error: err });
  }
};