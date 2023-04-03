import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany, Timestamp  } from 'typeorm';
import { User } from '../users/users.entity'

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    project_id: number;

    @Column()
    name: string;

    @Column()
    application: string;

    @Column()
    assoc_organisations: String;

    @Column()
    project_lead: string;

    @Column()
    status: string;

    @Column()
    owner: string;
}