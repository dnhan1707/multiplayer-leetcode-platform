import { Table, Model, Column, DataType, PrimaryKey, HasMany } from "sequelize-typescript";
import { Testcase } from "./testcase";


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

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "title"
    })
    declare title: string

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: "description"
    })
    declare description: string

    @Column({
        type: DataType.ENUM("easy", "medium", "hard"),
        allowNull: false,
        field: "difficulty_level"
    })
    declare difficulty_level: string


    @HasMany(() => Testcase)
    testcases!: Testcase[]
}
