import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'
import { GenderRole } from './entity.interface'

@Entity('user')
export class UserModel extends BaseEntity {
  @Column({ nullable: false, unique: true })
  name: string

  @Column({ nullable: true })
  nickname: string
  @Column({ nullable: false })
  password: string

  @Column({
    nullable: true,
    type: 'enum',
    enum: GenderRole,
    default: GenderRole.MALE
  })
  gender: GenderRole

  @Column({ nullable: true, default: null })
  birthday: Date

  @Column({ nullable: true, default: null })
  description: string

  @Column({ nullable: true })
  avatar: string

  @Column({ nullable: true, unique: true })
  phone: string

  @Column({ nullable: true, unique: true })
  mail: string

  @Column({ nullable: true })
  login_ip: string
}
