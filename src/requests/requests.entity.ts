import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany, Timestamp  } from 'typeorm';
import { User } from '../users/users.entity'

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user: User) => user.requests)
    user: User;

    @Column()
    email: string;

    @Column()
    project: string;

    @Column()
    earliestDate: string;

    @Column()
    latestDate: string;

    @Column()
    furtherInfo: string;

    @Column()
    status: string;

    @Column()
    organs: string;

    @Column()
    regions: string;

    @Column()
    samples: string;
}