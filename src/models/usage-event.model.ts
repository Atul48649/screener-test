import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const UsageEvent = sequelize.define(
    'UsageEvent',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        apiKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deploymentId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        inputTokens: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        outputTokens: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: 'usage_events',
        timestamps: true
    }
);