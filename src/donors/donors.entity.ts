import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Organ } from 'src/organs/organs.entity';

@Entity()
export class Donor {
    @Column({ nullable: true })
    odt: number;

    @Column()
    consent_type: string;
    
    @Column()
    consent_opt_out: string;
    
    @PrimaryColumn()
    achiever_participant_id: string;

    @Column({ nullable: true })
    RRID: number;

    @Column({ nullable: true })
    reason_declined_for_clinical_use: string | null;

    @Column({ nullable: true })
    sex: number | null;

    @Column({ nullable: true })
    age: number | null;

    @Column({ nullable: true })
    admission_date_to_hospital: Date | null;
    
    @Column({ nullable: true })
    admission_date_to_icu: Date| null;
    
    @Column({ nullable: true })
    length_of_itu_stay_days: number

    @Column({ nullable: true })
    primary_diagnosis: string| null;
    
    @Column({ nullable: true })
    blood_group: string| null;
    
    @Column({ nullable: true })
    rhesus_group: number| null;
    
    @Column({ nullable: true })
    type: string| null;
    
    @Column({ nullable: true })
    height_cm: number| null;
    
    @Column({ nullable: true })
    weight_kg: number| null;
    
    @Column({ nullable: true })
    girth_cm: number| null;
    
    @Column({ nullable: true })
    bmi: number| null;
    
    @Column({ nullable: true })
    is_patient_ventilated: number | null;

    @Column({ nullable: true })	
    trauma_chest: number | null;

    @Column({ nullable: true })	
    trauma_head : number | null;

    @Column({ nullable: true })	
    trauma_abdominal : number | null;

    @Column({ nullable: true })	
    trauma_other: number | null;

    @Column({ nullable: true })	
    trauma_other_details: string| null;

    @Column({ nullable: true })	
    ct_scan_results: string| null;

    //Observations
    @Column({ nullable: true })
    obs_1_datetime: Date| null;
    
    @Column({ nullable: true })
    obs_1_hr_bpm: number| null;
    
    @Column({ nullable: true })
    obs_1_bp_systolic: number| null;

    @Column({ nullable: true })
    obs_1_bp_diastolic: number| null;

    @Column({ nullable: true })
    obs_1_temperature: number| null;
    
    @Column({ nullable: true })
    obs_2_datetime: Date| null;

    @Column({ nullable: true })
    obs_2_hr_bpm: string| null;
    
    @Column({ nullable: true })
    obs_2_bp_systolic: string| null;
    
    @Column({ nullable: true })
    obs_2_bp_diastolic: string| null;
    
    @Column({ nullable: true })
    obs_2_temperature: string| null;
      
    @Column({ nullable: true })
    obs_3_datetime: string| null;
    
    @Column({ nullable: true })
    obs_3_hr_bpm: string| null;
      
    @Column({ nullable: true })
    obs_3_bp_systolic: string| null;
      
    @Column({ nullable: true })
    obs_3_bp_diastolic: string| null;
  
    @Column({ nullable: true })
    obs_3_temperature: string| null;
      
    @Column({ nullable: true })
    obs_4_datetime: string| null;
      
    @Column({ nullable: true })
    obs_4_hr_bpm: string| null;
      
    @Column({ nullable: true })
    obs_4_bp_systolic: string| null;
      
    @Column({ nullable: true })
    obs_4_bp_diastolic: string| null;
      
    @Column({ nullable: true })
    obs_4_temperature: string| null;
      
    @Column({ nullable: true })
    obs_5_datetime: string| null;
      
    @Column({ nullable: true })
    obs_5_hr_bpm: string| null;
      
    @Column({ nullable: true })
    obs_5_bp_systolic: string| null;
  
    @Column({ nullable: true })
    obs_5_bp_diastolic: string| null;
      
    @Column({ nullable: true })
    obs_5_temperature: string| null;
      
    @Column({ nullable: true })
    obs_comments: string| null;
    
    @Column({ nullable: true })
    hypotension: string| null;
    
    @Column({ nullable: true })
    hypertension: string| null;
    
    @Column({ nullable: true })
    ventilation_mode: string| null;
    
    //Blood Gases    
    @Column({nullable: true})
    bloodgases_obs1_result_stage: string| null;

    @Column({nullable: true})
    bloodgases_obs1_datetime: Date| null;

    @Column({ nullable: true })
    bloodgases_obs1_fio2: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs1_peep: string| null;

    @Column({ nullable: true })
    bloodgases_obs1_saturation: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs1_ph: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs1_pco2: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs1_po2: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs1_hco3: number| null;

    @Column({ nullable: true })
    bloodgases_obs1_be: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs1_lactate: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs1_pao2_fio2_ratio: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs2_result_stage: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs2_datetime: Date| null;
    
    @Column({ nullable: true })
    bloodgases_obs2_fio2: string| null;	
    
    @Column({ nullable: true })
    bloodgases_obs2_peep: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs2_saturation: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs2_ph: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs2_pco2: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs2_po2: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs2_hco3: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs2_be: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs2_lactate: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs2_pao2_fio2_ratio: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs3_result_stage: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs3_datetime: Date| null;
    
    @Column({ nullable: true })
    bloodgases_obs3_fio2: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs3_peep: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs3_saturation: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs3_ph: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs3_pco2: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs3_po2: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs3_hco3: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs3_be: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs3_lactate: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs3_pao2_fio2_ratio: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs4_result_stage: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs4_datetime: Date| null;
    
    @Column({ nullable: true })
    bloodgases_obs4_fio2: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs4_peep: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs4_saturation: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs4_ph: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs4_pco2: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs4_po2: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs4_hco3: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs4_be: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs4_lactate: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs4_pao2_fio2_ratio: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs5_result_stage: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs5_datetime: Date| null;
    
    @Column({ nullable: true })
    bloodgases_obs5_fio2: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs5_peep: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs5_saturation: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs5_ph: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs5_pco2: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs5_po2: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs5_hco3: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs5_be: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs5_lactate: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs5_pao2_fio2_ratio: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs6_result_stage: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs6_datetime: Date| null;
    
    @Column({ nullable: true })
    bloodgases_obs6_fio2: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs6_peep: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs6_saturation: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs6_ph: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs6_pco2: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs6_po2: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs6_hco3: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs6_be: number| null;
    
    @Column({ nullable: true })
    bloodgases_obs6_lactate: string| null;
    
    @Column({ nullable: true })
    bloodgases_obs6_pao2_fio2_ratio: string| null;
    // blood gases end


    @Column({ nullable: true })
    cardiac_arrest: string| null;
    
    @Column({ nullable: true })
    cardiac_arrest_duration: number| null;
    
    @Column({ nullable: true })
    cpr_at_time_arrest: string| null;
    
    @Column({ nullable: true })
    cpr_duration: number| null;
    
    @Column({ nullable: true })
    respiratory_arrest: string| null;
    
    @Column({ nullable: true })
    respiratory_arrest_duration: number| null;
    
    @Column({ nullable: true })
    down_time_min: number| null;

    @Column({ nullable: true })
    chest_xray: string| null;
    
    @Column({ nullable: true })
    chest_xray_abnormal_details: string| null;
    
    @Column({ nullable: true })
    cardiac_monitoring_in_situ: string| null;
    
    @Column({ nullable: true })
    echo_performed_in_donor: string| null;

    @Column({ nullable: true })
    echo_performed_datetime: Date| null;

    @Column({ nullable: true })
    estimated_ef: string| null;

    @Column({ nullable: true })
    interventricular_septum_thickness: string| null;
    
    @Column({ nullable: true })
    posterior_wall_thickness: string| null;
    
    @Column({ nullable: true })
    end_systolic_dimension: string| null;
    
    @Column({ nullable: true })
    end_diastolic_dimension: string| null;
    
    @Column({ nullable: true })
    fractional_shortening: string| null;
    
    @Column({ nullable: true })
    echo_test_comments: string| null;

    // urinalysis 
    
    @Column({ nullable: true })
    urinalysis_performed: string| null;

    @Column({ nullable: true })
    urinalysis_date: Date| null;
    
    @Column({ nullable: true })
    urinalysis_specific_gravity: number| null;
    
    @Column({ nullable: true })
    urinalysis_protein: number| null;
    
    @Column({ nullable: true })
    urinalysis_leukocytes: string| null;
    
    @Column({ nullable: true })
    urinalysis_ketones: string| null;
    
    @Column({ nullable: true })
    urinalysis_urobilinogen_mg_dl: number| null;
    
    @Column({ nullable: true })
    urinalysis_protein_creatinine_ratio_mg_mmol: number| null;
    
    @Column({ nullable: true })
    urinalysis_blood: string| null;
    
    @Column({ nullable: true })
    urinalysis_glucose: string| null;
    
    @Column({ nullable: true })
    urinalysis_nitrites: string| null;
    
    @Column({ nullable: true })
    urinalysis_bilirubin_umol_l: string| null;
    
    @Column({ nullable: true })
    urinalysis_pH: number| null;
    
    @Column({ nullable: true })
    urinalysis_albumin_creatinine_ratio_mg_mmol: number| null;
    

    // unsure where this sits
    @Column({ nullable: true })
    transfusions_given: string| null;


    //microbiology results:	

    //pre transfusion

    @Column({ nullable: true })
    pre_transfusion_tests_performed: string| null;
    
    @Column({ nullable: true })
    m_pre_HBsAg: string| null;
    
    @Column({ nullable: true })
    m_pre_HBcAb: string| null;
    
    @Column({ nullable: true })
    m_pre_HCV: string| null;
    
    @Column({ nullable: true })
    m_pre_HIV: string| null;
    
    @Column({ nullable: true })
    m_pre_CMV: string| null;
    
    @Column({ nullable: true })
    m_pre_EBV: string| null;
    
    @Column({ nullable: true })
    m_pre_HTLV: string| null;
    
    @Column({ nullable: true })
    m_pre_toxo: string| null;
    
    @Column({ nullable: true })
    m_pre_syphilis: string| null;
    
    @Column({ nullable: true })
    m_pre_HEV: string| null;
    
    @Column({ nullable: true })
    m_pre_malaria: string| null;
    
    @Column({ nullable: true })
    m_pre_T_cruzi: string| null;

    @Column({ nullable: true })
    m_pre_sars_cov2: string| null;
    
    @Column({ nullable: true })
    pregnancy_test_performed: string| null;

    @Column({ nullable: true })
    pregnancy_code_p: string| null;


    //microbiology post transfusion
    
    @Column({ nullable: true })
    m_post_HBsAg: string| null;
    
    @Column({ nullable: true })
    m_post_HBcAb: string| null;
    
    @Column({ nullable: true })
    m_post_HCV: string| null;
    
    @Column({ nullable: true })
    m_post_HIV: string| null;
    
    @Column({ nullable: true })
    m_post_CMV: string| null;
    
    @Column({ nullable: true })
    m_post_EBV: string| null;
    
    @Column({ nullable: true })
    m_post_HTLV: string| null;
    
    @Column({ nullable: true })
    m_post_toxo: string| null;
    
    @Column({ nullable: true })
    m_post_syphilis: string| null;
    
    @Column({ nullable: true })
    m_post_HEV: string| null;
    
    @Column({ nullable: true })
    m_post_malaria: string| null;
    
    @Column({ nullable: true })
    m_post_T_cruzi: string| null;

    @Column({ nullable: true })
    m_post_sars_cov2: string| null;

    
    //Blood results:	

    @Column({ nullable: true })
    blood_results_obs1_result_stage: string| null;
    
    @Column({ nullable: true })
    blood_results_obs1_datetime: Date| null;
    
    @Column({ nullable: true })
    blood_results_obs1_haemoglobin: number| null;
    
    @Column({ nullable: true })
    blood_results_obs1_serial_haematocrit: number| null;
    
    @Column({ nullable: true })
    blood_results_obs1_white_cell_count: number| null;
    
    @Column({ nullable: true })
    blood_results_obs1_platelets: number| null;
    
    @Column({ nullable: true })
    blood_results_obs1_prothrombin: number| null;
    
    @Column({ nullable: true })
    blood_results_obs1_aptt: number| null;
    
    @Column({ nullable: true })
    blood_results_obs1_inr: number| null;
    
    @Column({ nullable: true })
    blood_results_obs1_crp: number| null;
    
    @Column({ nullable: true })
    blood_results_obs1_hba1c: number| null;
    
    @Column({ nullable: true })
    blood_results_obs1_troponin_t: number| null;
    
    @Column({ nullable: true })
    blood_results_obs1_troponin_i: number| null;
    
    @Column({ nullable: true })
    blood_results_obs1_lactate: number| null;
    
    @Column({ nullable: true })
    blood_results_obs2_result_stage: string| null;
    
    @Column({ nullable: true })
    blood_results_obs2_datetime: Date| null;
    
    @Column({ nullable: true })
    blood_results_obs2_haemoglobin: number| null;
    
    @Column({ nullable: true })
    blood_results_obs2_serial_haematocrit: number| null;
    
    @Column({ nullable: true })
    blood_results_obs2_white_cell_count: number| null;
    
    @Column({ nullable: true })
    blood_results_obs2_platelets: number| null;
    
    @Column({ nullable: true })
    blood_results_obs2_prothrombin: number| null;
    
    @Column({ nullable: true })
    blood_results_obs2_aptt: number| null;
    
    @Column({ nullable: true })
    blood_results_obs2_inr: number| null;
    
    @Column({ nullable: true })
    blood_results_obs2_crp: number| null;
    
    @Column({ nullable: true })
    blood_results_obs2_hba1c: number| null;
    
    @Column({ nullable: true })
    blood_results_obs2_troponin_t: number| null;
    
    @Column({ nullable: true })
    blood_results_obs2_troponin_i: number| null;
    
    @Column({ nullable: true })
    blood_results_obs2_lactate: number| null;

    @Column({ nullable: true })
    blood_results_obs3_result_stage: string| null;
    
    @Column({ nullable: true })
    blood_results_obs3_datetime: Date| null;
    
    @Column({ nullable: true })
    blood_results_obs3_haemoglobin: number| null;
    
    @Column({ nullable: true })
    blood_results_obs3_serial_haematocrit: number| null;
    
    @Column({ nullable: true })
    blood_results_obs3_white_cell_count: number| null;
    
    @Column({ nullable: true })
    blood_results_obs3_platelets: number| null;
    
    @Column({ nullable: true })
    blood_results_obs3_prothrombin: number| null;
    
    @Column({ nullable: true })
    blood_results_obs3_aptt: number| null;
    
    @Column({ nullable: true })
    blood_results_obs3_inr: number| null;
    
    @Column({ nullable: true })
    blood_results_obs3_crp: number| null;
    
    @Column({ nullable: true })
    blood_results_obs3_hba1c: number| null;
    
    @Column({ nullable: true })
    blood_results_obs3_troponin_t: number| null;
    
    @Column({ nullable: true })
    blood_results_obs3_troponin_i: number| null;
    
    @Column({ nullable: true })
    blood_results_obs3_lactate: number| null;

    //Liver function tests:	
    @Column({ nullable: true })
    liver_test1_result_stage: string| null;
    
    
    @Column({ nullable: true })
    liver_test1_sample_datetime: Date| null;
    	
    @Column({ nullable: true })
    liver_test1_total_protein: number| null;
    
    @Column({ nullable: true })
    liver_test2_total_protein: number| null;
    
    @Column({ nullable: true })
    liver_test1_phosphate: number| null;
    
    @Column({ nullable: true })
    liver_test2_phosphate: number| null;
    
    @Column({ nullable: true })
    liver_test1_glucose: number| null;
    
    @Column({ nullable: true })
    liver_test2_glucose: number| null;
    
    @Column({ nullable: true })
    liver_test1_gamma: number| null;
    
    @Column({ nullable: true })
    liver_test2_gamma: number| null;
    
    @Column({ nullable: true })
    liver_test1_ast: number| null;
    
    @Column({ nullable: true })
    liver_test2_ast: number| null;
    
    @Column({ nullable: true })
    liver_test1_albumin: number| null;
    
    @Column({ nullable: true })
    liver_test2_albumin: number| null;
    
    @Column({ nullable: true })
    liver_test1_ldh: number| null;
    
    @Column({ nullable: true })
    liver_test2_ldh: number| null;
    
    @Column({ nullable: true })
    liver_test1_calcium: number| null;
    
    @Column({ nullable: true })
    liver_test2_calcium: number| null;
    
    @Column({ nullable: true })
    liver_test1_alk_phos: number| null;
    
    @Column({ nullable: true })
    liver_test2_alk_phos: number| null;
    
    @Column({ nullable: true })
    liver_test1_alt: number| null;
    
    @Column({ nullable: true })
    liver_test2_alt: number| null;
    
    @Column({ nullable: true })
    liver_test1_bilirubin: number| null;
    
    @Column({ nullable: true })
    liver_test2_bilirubin: number| null;
    
    @Column({ nullable: true })
    liver_test1_amylase: number| null;
    
    @Column({ nullable: true })
    liver_test2_amylase: number| null;

    @Column({ nullable: true })
    liver_test2_result_stage: string| null;
    
    
    @Column({ nullable: true })
    liver_test2_sample_datetime: Date| null;


    @Column({ nullable: true })
    liver_test3_result_stage: string| null;
    
    
    @Column({ nullable: true })
    liver_test3_sample_datetime: Date| null;





    
    @Column({ nullable: true })
    liver_test3_total_protein: number| null;
    

    
    @Column({ nullable: true })
    liver_test3_phosphate: number| null;
    

    
    @Column({ nullable: true })
    liver_test3_glucose: number| null;
    

    
    @Column({ nullable: true })
    liver_test3_gamma: number| null;
    

    
    @Column({ nullable: true })
    liver_test3_ast: number| null;
    

    
    @Column({ nullable: true })
    liver_test3_albumin: number| null;
    

    
    @Column({ nullable: true })
    liver_test3_ldh: number| null;
    

    
    @Column({ nullable: true })
    liver_test3_calcium: number| null;

    
    @Column({ nullable: true })
    liver_test3_alk_phos: number| null;
    

    
    @Column({ nullable: true })
    liver_test3_alt: number| null;

    
    @Column({ nullable: true })
    liver_test3_bilirubin: number| null;

    
    @Column({ nullable: true })
    liver_test3_amylase: number| null;
    
    @Column({ nullable: true })
    liver_test_other: string| null;
    
    //Urea and electrolytes:

    @Column({ nullable: true })
    urea_electrolytes_test1_result_stage: string| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test1_sample_datetime: Date| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test1_sodium: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test2_sodium: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test1_potassium: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test2_potassium: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test1_blood_urea: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test2_blood_urea: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test1_serum_creatinine: number| null;
    
    @Column({ nullable: true })	
    urea_electrolytes_test2_serum_creatinine: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test1_eGFR: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test2_eGFR: number| null;

    @Column({ nullable: true })
    urea_electrolytes_test2_result_stage: string| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test2_sample_datetime: Date| null;

    @Column({ nullable: true })
    urea_electrolytes_test3_result_stage: string| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test3_sample_datetime: Date| null;

    @Column({ nullable: true })
    urea_electrolytes_test4_result_stage: string| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test4_sample_datetime: Date| null;

    @Column({ nullable: true })
    urea_electrolytes_test3_sodium: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test4_sodium: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test3_potassium: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test4_potassium: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test3_blood_urea: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test4_blood_urea: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test3_serum_creatinine: number| null;
    
    @Column({ nullable: true })	
    urea_electrolytes_test4_serum_creatinine: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test3_eGFR: number| null;
    
    @Column({ nullable: true })
    urea_electrolytes_test4_eGFR: number| null;
    
    @Column({ nullable: true })	
    urea_electrolytes_renal_replacement_therapy: string| null;
    
    //Past medical History:	
    
    @Column({ nullable: true })	
    history_obtained_from: string| null;
    
    @Column({ nullable: true })	
    history_hypertension: string| null;
    
    @Column({ nullable: true })	
    history_cancer_or_malignancy: string| null;
    
    @Column({ nullable: true })	
    history_pulmonary_disease: string| null;
    
    @Column({ nullable: true })	
    hisotry_UTI: string| null;
    
    @Column({ nullable: true })	
    history_cardiac_disease: string| null;
    
    @Column({ nullable: true })	
    history_liver_disease: string| null;
    
    @Column({ nullable: true })	
    history_diabetes: string| null;
    
    @Column({ nullable: true })	
    diabetes_control: string| null;

    @Column({nullable: true})
    diabetes_diagnosis_date: Date| null;
    
    @Column({ nullable: true })	
    family_history_diabetes: string| null;

    @Column({nullable: true})
    family_history_diabetes_type: string| null;
    
    @Column({ nullable: true })	
    units_alcohol_per_day: string| null;
    
    @Column({ nullable: true })	
    period_time_alcohol_use: string| null;
    
    @Column({ nullable: true })	
    history_drug_abuse: string| null;

    @Column({ nullable: true })	
    history_drug_abuse_details: string| null;
    
    @Column({ nullable: true })	
    past_or_current_cigarette_smoker: string| null;
    
    @Column({ nullable: true })	
    number_cigarettes_day: string| null;
    
    @Column({ nullable: true })	
    period_time_smoking: string| null;
    
    @Column({ nullable: true })	
    date_stopped_smoking: string| null;
    
    @Column({ nullable: true })	
    allergies: string| null;
    
    // TODO check this column and the one below, as both labelled as other
    @Column({ nullable: true })	
    allergies_details: string| null;
    
    @Column({ nullable: true })	
    other_relevant_history: string| null;

    @Column({ nullable: true })	
    other_relevant_history_details: string| null;
    
    @Column({ nullable: true })	
    history_of_infection_during_admission: string| null;
    
    @Column({ nullable: true })	
    details_infection_during_admission: string| null;
    
    @Column({ nullable: true })	
    secretions: string| null;
    
    //Drugs at hospital:
    
    @Column({ nullable: true })		
    methyl_prednisolone: string| null;
    
    @Column({ nullable: true })	
    dopamine: string| null;
    
    @Column({ nullable: true })	
    dobutamine: string| null;
    
    @Column({ nullable: true })	
    adrenaline: string| null;
    
    @Column({ nullable: true })	
    noradrenaline: string| null;
    
    @Column({ nullable: true })	
    vasopressin: string| null;
    
    @Column({ nullable: true })	
    triiodothyronine_T3: string| null;
    
    @Column({ nullable: true })	
    insulin_administered: string| null;
    
    @Column({ nullable: true })	
    other_cardioactive_drug_1_administered: string| null;

    @Column({ nullable: true })	
    other_cardioactive_drug_1_name: string| null;

    @Column({ nullable: true })	
    other_cardioactive_drug_2_administered: string| null;

    @Column({ nullable: true })	
    other_cardioactive_drug_2_name: string| null;
    
    @Column({ nullable: true })	
    other_drugs_given: string| null;

    //Relationships... this hasn't updated

    @OneToMany(() => Organ, (organ: Organ) => organ.donor)
    organs: Organ[];
}