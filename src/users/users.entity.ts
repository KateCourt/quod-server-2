import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany, Timestamp } from 'typeorm';
import { Project } from '../projects/projects.entity'
import { Request } from '../requests/requests.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    surname: string;

    @Column()
    organisation: string;

    @Column()
    department: string;

    @Column({ default: 'Read' })
    role: String;

    @Column()
    status: String;

    @OneToMany(() => Request, (request: Request) => request.user)
    requests: Request[];
    
}