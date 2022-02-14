import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class ShowMovie extends BaseEntity {
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

  @ManyToMany((type) => Movie, (movie) => movie.showMovies, {
    eager: true,
  })
  @JoinTable()
  movies: Movie[];
}
