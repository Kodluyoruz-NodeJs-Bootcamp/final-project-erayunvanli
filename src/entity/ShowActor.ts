import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Actor } from "./Actor";

@Entity()
export class ShowActor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  userMail: string;

  @Column({
    nullable: false,
    type: Boolean,
    default: false,
  })
  published: boolean;

  @ManyToMany((type) => Actor, (actor) => actor.showActors, {
    eager: true,
  })
  @JoinTable()
  actors: Actor[];
}
