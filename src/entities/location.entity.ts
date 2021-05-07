import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Geometry } from "geojson"

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    coords!: Geometry

} 