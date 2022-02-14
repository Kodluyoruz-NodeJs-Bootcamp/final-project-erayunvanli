import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm";
import { ShowActor } from "./ShowActor";

@Entity()
export class Actor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userMail: string;

  @Column({
    nullable: false,
    type: Boolean,
    default: false,
  })
  published: boolean;

  @ManyToMany((type) => ShowActor, (showActors) => showActors.actors)
  showActors: ShowActor[];
}
