import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserCreationAttrs {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, IUserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
