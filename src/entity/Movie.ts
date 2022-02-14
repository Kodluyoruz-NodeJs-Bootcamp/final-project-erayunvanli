import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm";
import { ShowMovie } from "./ShowMovie";

@Entity()
export class Movie extends BaseEntity {
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

  @ManyToMany((type) => ShowMovie, (showMovies) => showMovies.movies)
  showMovies: ShowMovie[];
}
