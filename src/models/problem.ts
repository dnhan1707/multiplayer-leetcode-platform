import { Table, Model, Column, DataType, PrimaryKey } from "sequelize-typescript";


@Table({
    tableName: "problems",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
})

export class Problem extends Model{
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        field: "problem_id"
    })
    declare problem_id: string
}
