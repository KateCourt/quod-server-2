import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany, Timestamp } from 'typeorm';
import { Organ } from '../organs/organs.entity'
import { Sample } from '../samples/samples.entity';

@Entity()
export class Region {
    @PrimaryGeneratedColumn()
    auto_region_id: number;

    @Column()	
    region_id: string;

    @Column()	
    participant_id: string;

    @Column()	
    organ_id: number;

    @Column()	
    region_location: string| null;


    // Exeter fields

    @Column({ nullable: true })	
    percent_endocrine_area_anterior: number| null;
    @Column({ nullable: true })	
    percent_endocrine_area_posterior: number| null;

    @Column({ nullable: true })	
    num_islets_mm2_anterior: number| null;
    @Column({ nullable: true })	
    num_islets_mm2__posterior: number| null;

    @Column({ nullable: true })	
    median_islet_size_anterior: number| null;
    @Column({ nullable: true })	
    median_islet_size_posterior: number| null;

    @Column({ nullable: true })	
    median_islet_circularity_anterior: number| null;
    @Column({ nullable: true })	
    median_islet_circularity_posterior: number| null;


    @Column({ nullable: true })	
    median_islet_diameter_anterior: number| null;
    @Column({ nullable: true })	
    median_islet_diameter_posterior: number| null;

    @Column({ nullable: true })	
    percent_fat_area_anterior: number| null;
    @Column({ nullable: true })	
    percent_fat_area_posterior: number| null;

    @Column({ nullable: true })	
    interlobular_fat_area_anterior: number| null;
    @Column({ nullable: true })	
    interlobular_fat_area_posterior: number| null;
    @Column({ nullable: true })	
    intralobular_fat_area_anterior: number| null;
    @Column({ nullable: true })	
    intralobular_fat_area_posterior: number| null;

    @Column({ nullable: true })	// changed fibrosis to sr as per call on 8/4/22
    percent_sr_area_anterior: number| null;
    @Column({ nullable: true })	// changed fibrosis to sr as per call on 8/4/22
    percent_sr_area_posterior: number| null;

    @Column({ nullable: true })	
    sr_intensity_score_anterior: number| null;
    @Column({ nullable: true })	
    sr_intensity_score_posterior: number| null;

    // pathologist evaluation additional fields

    @Column({ nullable: true })	
    insulitis_anterior: string | null;
    @Column({ nullable: true })	
    insulitis_posterior: string | null;

    @Column({ nullable: true })	
    amyloidosis_anterior: string | null;
    @Column({ nullable: true })	
    amyloidosis_posterior: string | null;

    @Column({ nullable: true })	
    microadenoma_anterior: string | null;
    @Column({ nullable: true })	
    microadenoma_posterior: string | null;

    @Column({ nullable: true })	
    exocrine_pancreas_inflammatory_cell_infiltration_anterior : string | null;
    @Column({ nullable: true })	
    exocrine_pancreas_inflammatory_cell_infiltration_posterior : string | null;
    
    @Column({ nullable: true })	//this is true/false
    panin_anterior: string | null;
    @Column({ nullable: true })	//this is true/false
    panin_posterior: string | null;
    
    @Column({ nullable: true })	
    ipmn_anterior: string | null;
    @Column({ nullable: true })	
    ipmn_posterior: string | null;

    @Column({ nullable: true })	
    ductal_carcinoma_anterior: string | null;
    @Column({ nullable: true })	
    ductal_carcinoma_posterior: string | null;

    // undecided if this is the best way to do images, 6 per region

    @Column({ nullable: true })	
    anterior_img1: string | null;
    @Column({ nullable: true })	
    anterior_img2: string | null;
    @Column({ nullable: true })	
    anterior_img3: string | null;

    @Column({ nullable: true })	
    posterior_img1: string | null;
    @Column({ nullable: true })	
    posterior_img2: string | null;
    @Column({ nullable: true })	
    posterior_img3: string | null;




    
    @Column({ nullable: true })	
    available: string | null;

    @ManyToOne(() => Organ, (organ: Organ) => organ.regions)
    organ: Organ;

    @OneToMany(() => Sample, (samples: Sample) => samples.region)
    samples: Sample[];


}