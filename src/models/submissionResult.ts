import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Submission } from "./submission";
import { Testcase } from "./testcase";

@Table({
    tableName: "submission_results",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
})
export class SubmissionResult extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        field: 'result_id'
    })
    declare result_id: string;

    @ForeignKey(() => Submission)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'submission_id'
    })
    declare submission_id: string;

    @ForeignKey(() => Testcase)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'test_case_id'
    })
    declare test_case_id: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: 'output'
    })
    declare output: string;

    @Column({
        type: DataType.ENUM('passed', 'failed', 'error'),
        allowNull: false,
        field: 'status'
    })
    declare status: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: 'execution_time'
    })
    declare execution_time: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: 'memory_used'
    })
    declare memory_used: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: 'error_message'
    })
    declare error_message: string;

    @BelongsTo(() => Submission)
    submission!: Submission;

    @BelongsTo(() => Testcase)
    testCase!: Testcase;
}