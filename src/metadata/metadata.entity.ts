import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';

/* Each column in each tissue-related table has a metadata entry.
This was initially so that the data could be split into categories in the UI
but the table has since expanded to cover labels and the filtering method
*/

@Entity()
export class Metadata {

    @PrimaryGeneratedColumn()
    metadata_id: number;

    // The table: Donor, Organ, Region or Sample
    @Column()
    table: string;

    // Column Identifier
    @Column()
    column_name: string;

    // The label visibile in the UI
    @Column()
    label: string;

    // Category for it to sit in in the UI for view or filtering
    @Column()
    category: string;

    // Method of filtering this data, high and low range/picklist
    @Column({ nullable: true })
    filterType: string| null;
    
}