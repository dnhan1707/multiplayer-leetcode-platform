"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserNameInRoom = exports.updateRoom = exports.removeRoom = exports.getAllRooms = exports.getRoomDetails = exports.joinRoom = exports.generateRoom = void 0;
const generateRoom = async (req, res) => {
    try {
        const { size } = req.params;
        // Generate room in database here
        res.status(201).json({ message: `Room created with number of players: ${size}` });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create room", error: err });
    }
};
exports.generateRoom = generateRoom;
const joinRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        // Add user to room in database here
        res.status(200).json({ message: `User ${userId} joined room ${id}` });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to join room", error: err });
    }
};
exports.joinRoom = joinRoom;
const getRoomDetails = async (req, res) => {
    try {
        const { id } = req.params;
        // Fetch room details from database here
        res.status(200).json({ message: "Room details", roomId: id });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to get room details", error: err });
    }
};
exports.getRoomDetails = getRoomDetails;
const getAllRooms = async (req, res) => {
    try {
        // Fetch all rooms from database here
        res.status(200).json({ message: "All rooms" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to get rooms", error: err });
    }
};
exports.getAllRooms = getAllRooms;
const removeRoom = async (req, res) => {
    try {
        const { id } = req.params;
        // Remove room from database here
        res.status(200).json({ message: "Room removed" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to remove room", error: err });
    }
};
exports.removeRoom = removeRoom;
const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, size } = req.body;
        // Update room status and size in database here
        res.status(200).json({ message: `Room status updated to ${status}` });
        res.status(200).json({ message: `Room size updated to ${size}` });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update room", error: err });
    }
};
exports.updateRoom = updateRoom;
const updateUserNameInRoom = async (req, res) => {
    try {
        const { id, socketid, newName } = req.params;
        // Update user name in room in database here
        res.status(200).json({ message: `Room user ${socketid} updated to ${newName}` });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update room", error: err });
    }
};
exports.updateUserNameInRoom = updateUserNameInRoom;
