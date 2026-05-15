import {
    DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model
} from 'sequelize';
import { sequelize } from '../config/database';

export enum DeploymentStatus {
    PROVISIONING = 'provisioning',
    READY = 'ready',
    TERMINATED = 'terminated'
}

export interface DeploymentModel extends Model<InferAttributes<DeploymentModel>, InferCreationAttributes<DeploymentModel>> {
    id: CreationOptional<string>;
    model: 'model-a' | 'model-b';
    status: DeploymentStatus;
    apiKey?: string;
    endpointUrl?: string;
    terminatedAt?: Date;
}

export const Deployment = sequelize.define<DeploymentModel>(
    'Deployment',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        model: {
            type: DataTypes.ENUM('model-a', 'model-b'),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(
                'provisioning',
                'ready',
                'terminated'
            ),
            allowNull: false
        },
        apiKey: {
            type: DataTypes.STRING
        },
        endpointUrl: {
            type: DataTypes.STRING
        },
        terminatedAt: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'deployments',
        timestamps: true
    }
);