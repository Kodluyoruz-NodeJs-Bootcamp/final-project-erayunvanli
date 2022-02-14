import * as showMovie from "../controller/admin/ShowMoviesController";

export const showMovies = [
  {
    path: "/showMovies",
    method: "get",
    action: showMovie.index,
  },
  {
    path: "/showMovies/new",
    method: "get",
    action: showMovie.newShowMovie,
  },
  {
    path: "/showMovies",
    method: "post",
    action: showMovie.create,
  },
  {
    path: "/showMovies/:id",
    method: "get",
    action: showMovie.show,
  },
  {
    path: "/showMovies/:id/edit",
    method: "get",
    action: showMovie.edit,
  },
  {
    path: "/showMovies/:id",
    method: "put",
    action: showMovie.update,
  },
  {
    path: "/showMovies/:id",
    method: "delete",
    action: showMovie.destroy,
  },
];
