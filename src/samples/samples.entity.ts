import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany, Timestamp } from 'typeorm';
import { Region } from '../regions/regions.entity'

@Entity()
export class Sample {
    @PrimaryGeneratedColumn()
    auto_sample_id: number;

    @Column()	
    sample_id: string;

    @Column()	
    participant_id: string;

    @Column()	
    region_id: string;

    @Column({ nullable: true })	
    sample_type: string| null;

    @Column({ nullable: true })	
    sample_location: string| null;

    @Column({ nullable: true })	
    date_time_placed_formalin: string| null;

    @Column({ nullable: true })	
    cit_formalin	: string| null;

    @Column({ nullable: true })	
    date_time_frozen: string| null;
    
    @Column({ nullable: true })	
    cit_frozen	: string| null;

    @Column({ nullable: true })	
    date_time_placed_glutaraldehyde	: string| null;

    @Column({ nullable: true })	
    cit_tem: string| null;

    @Column({ nullable: true })	
    date_time_placed_rnalater: string| null;

    @Column({ nullable: true })	
    cit_rnalater: string| null;	

    @Column({ nullable: true })	
    date_time_cryovial_frozen	: string| null;

    @Column({ nullable: true })	
    cit_proteomics	: string| null;

    @Column({ nullable: true })	
    date_samples_taken: string| null;

    @Column({ nullable: true })	
    available: string | null;

    @ManyToOne(() => Region, (region: Region) => region.samples)
    region: Region;


}