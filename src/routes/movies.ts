import * as movie from "../controller/admin/MovieController";

export const movies = [
  {
    path: "/movies",
    method: "get",
    action: movie.index,
  },
  {
    path: "/movies/new",
    method: "get",
    action: movie.newMovie,
  },
  {
    path: "/movies",
    method: "post",
    action: movie.create,
  },
  {
    path: "/movies/:id",
    method: "get",
    action: movie.show,
  },
  {
    path: "/movies/:id/edit",
    method: "get",
    action: movie.edit,
  },
  {
    path: "/movies/:id",
    method: "put",
    action: movie.update,
  },
  {
    path: "/movies/:id",
    method: "delete",
    action: movie.destroy,
  },
];
