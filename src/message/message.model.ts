import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IMessageCreationAttrs {
  author: string;
  body: string;
}

@Table({ tableName: 'Message' })
export class Message extends Model<Message, IMessageCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  author: string;
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  body: string;
}
