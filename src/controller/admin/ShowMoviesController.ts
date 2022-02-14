import { ShowMovie } from "./../../entity/ShowMovie";
import { Request, Response } from "express";
import { getManager, Equal, Like } from "typeorm";
import { Movie } from "../../entity/Movie";
import { movies } from "./../../routes/movies";

export async function index(request: Request, response: Response) {
  const showMovies = await Movie.find({
    where: [{ published: true }],
  });

  response.render("showMovies/index", {
    username: request["oidc"].user,
    title: "All Movies",
    page_name: "showMovies",
    showMovies,
  });
}

export async function show(request: Request, response: Response) {
  try {
    const showMovie = await Movie.find();
    response.render("showMovies/show", {
      username: request["oidc"].user,
      title: "ShowMovie",
      page_name: "showMovies",
      showMovie,
    });
  } catch (e) {
    response.redirect("/");
  }
}

export async function newShowMovie(request: Request, response: Response) {
  const showMovie = new ShowMovie();
  const movies = await Movie.find({ select: ["id", "name"] });
  response.render("showMovies/new", {
    username: request["oidc"].user,
    title: "New ShowMovie",
    page_name: "showMovies",
    showMovie,
    movies,
  });
}

export async function create(request: Request, response: Response) {
  const username = request["oidc"].user;
  const { comment, movies } = request.body;
  const showMovie = new ShowMovie();
  showMovie.comment = comment;
  showMovie.userMail = username.name;
  showMovie.movies = await Movie.findByIds(movies);

  await showMovie.save();

  response.redirect("/showMovies");
}

export async function edit(request: Request, response: Response) {
  try {
    const movies = await Movie.find({ select: ["id", "name"] });
    const showMovie = await ShowMovie.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    response.render("showMovies/edit", {
      username: request["oidc"].user,
      title: "Edit ShowMovie",
      page_name: "showMovies",
      showMovie,
      movies,
    });
  } catch (e) {
    response.redirect("/");
  }
}

export async function update(request: Request, response: Response) {
  try {
    const showMovie = await ShowMovie.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    const username = request["oidc"].user;
    const { comment, movies } = request.body;
    showMovie.comment = comment;
    showMovie.userMail = username.name;
    showMovie.movies = await Movie.findByIds(movies);
    await showMovie.save();
    response.redirect(`/showMovies/${showMovie.id}`);
  } catch (e) {
    response.redirect("/");
  }
}

export async function destroy(request: Request, response: Response) {
  try {
    const showMovie = await ShowMovie.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    await showMovie.remove();
    response.redirect("/showMovies");
  } catch (e) {
    response.redirect("/");
  }
}
