import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany, Timestamp } from 'typeorm';
import { Donor } from '../donors/donors.entity';
import { Region } from '../regions/regions.entity';

@Entity()
export class Organ {
    @PrimaryGeneratedColumn()
    organ_id: number;

    
    @Column()	
    organ_type: string;

    @Column()	
    participant_id: string;

    @Column({ nullable: true })	
    date_time_surgery_commenced: string| null;

    @Column({ nullable: true })	
    date_time_ventilation_ceased: string| null;

    @Column({ nullable: true })	
    date_time_circulatory_arrest: string| null;

    @Column({ nullable: true })	
    type_perfusate: string| null;

    @Column({ nullable: true })	
    date_time_perfusion_commenced: string| null;

    @Column({ nullable: true })	
    warm_ischaemia_time_min: number| null;

    @Column({ nullable: true })	
    cold_ischemic_time_midpoint: number| null;

    //pancreas_observations	confirmed number by MHS 12/04/22

    @Column({ nullable: true })	
    pancreas_weight_g: number| null;

    @Column({ nullable: true })	
    pancreas_quality: string| null;

    @Column({ nullable: true })	
    pancreas_blood: string| null;

    @Column({ nullable: true })	
    pancreas_fat: string| null;

    @Column({ nullable: true })	
    pancreas_color: string| null;

    @Column({ nullable: true })	
    firmness: string| null;

    @Column({ nullable: true })	
    fibrosis: string| null;

    // Exeter fields - Image-based AI quantification
    @Column({ nullable: true })	
    perc_endocrine_area_numvals: number| null;
    @Column({ type: "float", nullable: true })
    perc_endocrine_area_minumum: number| null;
    @Column({ type: "float", nullable: true })	
    perc_endocrine_area_25percentile: number| null;
    @Column({ type: "float", nullable: true })	
    perc_endocrine_area_median: number| null;
    @Column({ type: "float", nullable: true })	
    perc_endocrine_area_75percentile: number| null;
    @Column({ type: "float", nullable: true })	
    perc_endocrine_area_maximum: number| null;
    @Column({ type: "float", nullable: true })	
    perc_endocrine_area_range: number| null;

    @Column({ nullable: true })	
    perc_fat_area_numvals: number| null;
    @Column({ type: "float", nullable: true })	
    perc_fat_area_minumum: number| null;
    @Column({ type: "float", nullable: true })	
    perc_fat_area_25percentile: number| null;
    @Column({ type: "float", nullable: true })	
    perc_fat_area_median: number| null;
    @Column({ type: "float", nullable: true })	
    perc_fat_area_75percentile: number| null;
    @Column({ type: "float", nullable: true })	
    perc_fat_area_maximum: number| null;
    @Column({ type: "float", nullable: true })	
    perc_fat_area_range: number| null;

    @Column({ nullable: true })	
    perc_intralobular_fat_area_numvals: number| null;
    @Column({ type: "float", nullable: true })	
    perc_intralobular_fat_area_minumum: number| null;
    @Column({ type: "float", nullable: true })	
    perc_intralobular_fat_area_25percentile: number| null;
    @Column({ type: "float", nullable: true })	
    perc_intralobular_fat_area_median: number| null;
    @Column({ type: "float", nullable: true })	
    perc_intralobular_fat_area_75percentile: number| null;
    @Column({ type: "float", nullable: true })	
    perc_intralobular_fat_area_maximum: number| null;
    @Column({ type: "float", nullable: true })	
    perc_intralobular_fat_area_range: number| null;

    @Column({ nullable: true })	
    perc_interlobular_fat_area_numvals: number| null;
    @Column({ type: "float", nullable: true })	
    perc_interlobular_fat_area_minumum: number| null;
    @Column({ type: "float", nullable: true })	
    perc_interlobular_fat_area_25percentile: number| null;
    @Column({ type: "float", nullable: true })	
    perc_interlobular_fat_area_median: number| null;
    @Column({ type: "float", nullable: true })	
    perc_interlobular_fat_area_75percentile: number| null;
    @Column({ type: "float", nullable: true })	
    perc_interlobular_fat_area_maximum: number| null;
    @Column({ type: "float", nullable: true })	
    perc_interlobular_fat_area_range: number| null;

    @Column({ nullable: true })	
    perc_sr_area_numvals: number| null; // all changed srfg to sr as per call on 8/4/22
    @Column({ type: "float", nullable: true })	
    perc_sr_area_minumum: number| null;
    @Column({ type: "float", nullable: true })	
    perc_sr_area_25percentile: number| null;
    @Column({ type: "float", nullable: true })	
    perc_sr_area_median: number| null;
    @Column({ type: "float", nullable: true })	
    perc_sr_area_75percentile: number| null;
    @Column({ type: "float", nullable: true })	
    perc_sr_area_maximum: number| null;
    @Column({ type: "float", nullable: true })	
    perc_sr_area_range: number| null;

    @Column({ nullable: true })	
    islet_density_mm2_numvals: number| null;
    @Column({ type: "float", nullable: true })	
    islet_density_mm2_minumum: number| null;
    @Column({ type: "float", nullable: true })	
    islet_density_mm2_25percentile: number| null;
    @Column({ type: "float", nullable: true })	
    islet_density_mm2_median: number| null;
    @Column({ type: "float", nullable: true })	
    islet_density_mm2_75percentile: number| null;
    @Column({ type: "float", nullable: true })	
    islet_density_mm2_maximum: number| null;
    @Column({ type: "float", nullable: true })	
    islet_density_mm2_range: number| null;

    @Column({ nullable: true })	
    islet_size_um2_numvals: number| null;
    @Column({ type: "float", nullable: true })	
    islet_size_um2_minumum: number| null;
    @Column({ type: "float", nullable: true })	
    islet_size_um2_25percentile: number| null;
    @Column({ type: "float", nullable: true })	
    islet_size_um2_median: number| null;
    @Column({ type: "float", nullable: true })	
    islet_size_um2_75percentile: number| null;
    @Column({ type: "float", nullable: true })	
    islet_size_um2_maximum: number| null;
    @Column({ type: "float", nullable: true })	
    islet_size_um2_range: number| null;

    @Column({ nullable: true })	
    islet_circularity_numvals: number| null;
    @Column({ type: "float", nullable: true })	
    islet_circularity_minumum: number| null;
    @Column({ type: "float", nullable: true })	
    islet_circularity_25percentile: number| null;
    @Column({ type: "float", nullable: true })	
    islet_circularity_median: number| null;
    @Column({ type: "float", nullable: true })	
    islet_circularity_75percentile: number| null;
    @Column({ type: "float", nullable: true })	
    islet_circularity_maximum: number| null;
    @Column({ type: "float", nullable: true })	
    islet_circularity_range: number| null;

    @Column({ nullable: true })	
    islet_diameter_um2_numvals: number| null;
    @Column({ type: "float", nullable: true })	
    islet_diameter_um2_minumum: number| null;
    @Column({ type: "float", nullable: true })	
    islet_diameter_um2_25percentile: number| null;
    @Column({ type: "float", nullable: true })	
    islet_diameter_um2_median: number| null;
    @Column({ type: "float", nullable: true })	
    islet_diameter_um2_75percentile: number| null;
    @Column({ type: "float", nullable: true })	
    islet_diameter_um2_maximum: number| null;
    @Column({ type: "float", nullable: true })	
    islet_diameter_um2_range: number| null;

    @Column({ nullable: true })	
    peri_islet_sr_area_numvals: number| null; // changed collagen to sr as per call on 8/4/22
    @Column({ type: "float", nullable: true })	
    peri_islet_sr_area_minumum: number| null;
    @Column({ type: "float", nullable: true })	
    peri_islet_sr_area_25percentile: number| null;
    @Column({ type: "float", nullable: true })	
    peri_islet_sr_area_median: number| null;
    @Column({ type: "float", nullable: true })	
    peri_islet_sr_area_75percentile: number| null;
    @Column({ type: "float", nullable: true })	
    peri_islet_sr_area_maximum: number| null;
    @Column({ type: "float", nullable: true })	
    peri_islet_sr_area_range: number| null;
    
    @Column({ nullable: true })	
    total_islet_sr_area_numvals: number| null; // changed collagen to sr as per call on 8/4/22
    @Column({ type: "float", nullable: true })	
    total_islet_sr_area_minumum: number| null;
    @Column({ type: "float", nullable: true })	
    total_islet_sr_area_25percentile: number| null;
    @Column({ type: "float", nullable: true })	
    total_islet_sr_area_median: number| null;
    @Column({ type: "float", nullable: true })	
    total_islet_sr_area_75percentile: number| null;
    @Column({ type: "float", nullable: true })	
    total_islet_sr_area_maximum: number| null;
    @Column({ type: "float", nullable: true })	
    total_islet_sr_area_range: number| null;


    @Column({ type: "float", nullable: true })	
    calculated_endocrine_mass_g: number| null;
    @Column({ type: "float", nullable: true })	
    calculated_fat_mass_g: number| null;
    @Column({ type: "float", nullable: true })	
    calculated_collagen_mass_g: number| null;
    
    //pathologist evaluation

    @Column({ nullable: true })	
    pathologist_evaluation_long: string | null;

    @Column({ nullable: true })	
    insulitis: string | null;

    @Column({ nullable: true })	
    amyloidosis: string | null;

    @Column({ nullable: true })	
    microadenoma: string | null;

    @Column({ nullable: true })	
    exocrine_pancreas_inflammatory_cell_infiltration : string | null;
    
    @Column({ nullable: true })	
    panin: string | null;   //this is now true false according to jim meeting 8/4/22, changed to text to prevent errors occuring with one boolean in the spreadsheet
    
    @Column({ nullable: true })	
    ipmn: string | null;

    @Column({ nullable: true })	
    ductal_carcinoma: string | null;

    // undecided if this is the best way to do images

    @Column({ nullable: true })	
    image1: string | null;

    @Column({ nullable: true })	
    image2: string | null;

    @Column({ nullable: true })	
    image3: string | null;
    
    @Column({ nullable: true })	
    available: string | null;

    @ManyToOne(() => Donor, (donor: Donor) => donor.organs)
    donor: Donor;

    @OneToMany(() => Region, (regions: Region) => regions.organ)
    regions: Region[];

}