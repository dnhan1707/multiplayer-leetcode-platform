import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Problem } from "./problem";

@Table({
    tableName: "testcases",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
})
export class Testcase extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        field: 'test_id'
    })
    declare test_id: string;

    @ForeignKey(() => Problem)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'problem_id'
    })
    declare problem_id: string;

    @BelongsTo(() => Problem)
    problem!: Problem;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: 'input_data'
    })
    declare input_data: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'expected_output'
    })
    declare expected_output: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        field: 'is_hidden'
    })
    declare is_hidden: boolean;
}