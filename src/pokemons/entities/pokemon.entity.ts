import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn() // Genera un id autoincremental, si sólo fuera clave sería @PrimaryColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
    nombre: string;
  @Column()
    tipo: string;
  @Column()
    hp: number;
  @Column()
    att: number;
  @Column()
    deff: number;
  @Column()
    spatt: number;
    @Column()
    spdef: number;
    @Column()
    speed: number;
}
