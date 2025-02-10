import { RoomParticipant } from "../models/roomParticipant";
import { Room } from "../models/room";
import { User } from "../models/user";

enum RoomStatus {
    Ready = "ready",
    Playing = "playing",
    Finished = "finished"
}

export class RoomParticipantService {
    // Function to add that player in the Table (including role)
    async createParticipant(userId: string, roomId: string, role: string) {
        try {
            const room = await Room.findByPk(roomId);
            if (!room) {
                throw new Error("Room does not exist");
            }

            switch (room.status) {
                case RoomStatus.Ready:
                    throw new Error("Room is full");
                case RoomStatus.Playing:
                    throw new Error("Room is playing");
                case RoomStatus.Finished:
                    throw new Error("Room is finished but not eliminated yet");
            }

            const alreadyParticipant = await RoomParticipant.findOne({
                where: { user_id: userId, room_id: roomId }
            });

            if (alreadyParticipant) {
                throw new Error("User is already a participant in another Room");
            }

            const newParticipant = await RoomParticipant.create({
                user_id: userId,
                room_id: roomId,
                joined_at: new Date(),
                role: role
            });

            const participantCount = await RoomParticipant.count({
                where: { room_id: roomId }
            });

            if (participantCount >= room.max_players) {
                await room.update({ status: RoomStatus.Ready });
            }

            return newParticipant;

        } catch (error) {
            console.error(`User ${userId} couldn't join room: ${roomId}`, error);
            throw error;
        }
    }

    // Function to find user's role from roomId, userId
    async findUserRole(userId: string, roomId: string) {
        try {
            const room = await Room.findByPk(roomId);
            if (!room) {
                throw new Error("Room does not exist");
            }

            const user = await RoomParticipant.findOne({
                where: {
                    room_id: roomId,
                    user_id: userId
                }
            });

            if (!user) {
                throw new Error("User not found in this room");
            }

            return user.role;
        } catch (error) {
            throw new Error("Error finding user role: " + error);
        }
    }

    // Update user's role from roomId, userID, userGetChange
    async updateToOwner(userId: string, roomId: string) {
        try {
            const room = await Room.findByPk(roomId);
            if (!room) {
                throw new Error("Room does not exist");
            }

            const participants = await RoomParticipant.findAll({
                where: { room_id: roomId }
            });

            if (!participants || participants.length === 0) {
                throw new Error("No participants found in this room");
            }

            let userFound = false;

            for (const participant of participants) {
                if (participant.user_id === userId) {
                    participant.role = "Owner";
                    userFound = true;
                } else {
                    participant.role = "Participant";
                }
                await participant.save();
            }

            if (!userFound) {
                throw new Error("User not found in this room");
            }

            return participants;
        } catch (error) {
            throw new Error("Error updating roles: " + error);
        }
    }

    // Function to get a list of objects that has username and its role
    async getUsersWithRoles(roomCode: string): Promise<{ username: string; role: string }[]> {
        try {
            const room = await Room.findOne({where: {room_code: roomCode}})
            if (!room) {
                throw new Error(`Room with code ${roomCode} not found.`);
            
            }
            console.log('Room: ',room);
            const roomId = room.dataValues.id;
            const participants = await RoomParticipant.findAll({
                where: { room_id: roomId },
                include: [
                  {
                    model: User,
                    attributes: ['username'],
                  },
              ],
            });
            console.log('Participants: ',participants);

      
          // Map the results to the desired format
          const result = participants.map(participant => ({
            username: participant.user?.username || 'Unknown',
            role: participant.role,
          }));
          
          console.log('Result: ',result);

          return result;
        } catch (error) {
          console.error('Error fetching users with roles:', error);
          throw error;
        }
      }
}