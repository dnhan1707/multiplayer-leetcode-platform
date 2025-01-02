import { Table, Column, Model, DataType, BelongsToMany, BeforeCreate, BeforeUpdate } from "sequelize-typescript";
import { Room } from "./room";
import { RoomParticipant } from "./roomParticipant";
import bcrypt from "bcrypt";

@Table({
  tableName: "users",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    field: "user_id",
  })
  declare id: string;

  @BelongsToMany(() => Room, () => RoomParticipant)
  rooms!: Room[]

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare password: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if(instance.changed("password")) {
      instance.password = await bcrypt.hash(instance.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
