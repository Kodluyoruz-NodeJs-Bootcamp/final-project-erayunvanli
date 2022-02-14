import { Movie } from "./../../entity/Movie";
import { Request, Response } from "express";
import { getManager, Equal, Like } from "typeorm";

export async function index(request: Request, response: Response) {
  const movies = await Movie.find({
    where: [{ userMail: request["oidc"].user.name }],
  });

  response.render("movies/index", {
    username: request["oidc"].user,
    title: "All Movies",
    page_name: "movies",
    movies: movies,
  });
}

export async function show(request: Request, response: Response) {
  try {
    const movie = await Movie.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    response.render("movies/show", {
      username: request["oidc"].user,
      title: "Movie",
      page_name: "movies",
      movie,
    });
  } catch (e) {
    response.redirect("/");
  }
}

export async function newMovie(request: Request, response: Response) {
  response.render("movies/new", {
    username: request["oidc"].user,
    title: "New Movie",
    page_name: "movies",
    movie: new Movie(),
  });
}

export async function create(request: Request, response: Response) {
  const username = request["oidc"].user;
  const { name, published } = request.body;
  const movie = new Movie();
  movie.name = name;
  movie.userMail = username.name;
  movie.published = published;
  await movie.save();

  response.redirect("/movies");
}

export async function edit(request: Request, response: Response) {
  try {
    const movie = await Movie.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    response.render("movies/edit", {
      username: request["oidc"].user,
      title: "Edit Movie",
      page_name: "movies",
      movie,
    });
  } catch (e) {
    response.redirect("/");
  }
}

export async function update(request: Request, response: Response) {
  try {
    const movie = await Movie.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    const username = request["oidc"].user;
    const { name, published } = request.body;
    movie.name = name;
    movie.userMail = username.name;
    movie.published = published === "on" ? true : false;
    await movie.save();
    response.redirect(`/movies/${movie.id}`);
  } catch (e) {
    response.redirect("/");
  }
}
export async function destroy(request: Request, response: Response) {
  try {
    const movie = await Movie.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    await movie.remove();
    response.redirect("/showMovies");
  } catch (e) {
    response.redirect("/");
  }
}
