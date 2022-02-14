import { movies } from "./movies";
import { actors } from "./actors";
import { showMovies } from "./showMovies";
import { showActors } from "./showActors";
export default [...movies, ...actors, ...showMovies, ...showActors];
