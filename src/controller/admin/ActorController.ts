import { Actor } from "./../../entity/Actor";
import { Request, Response } from "express";
import { getManager } from "typeorm";

export async function index(request: Request, response: Response) {
  const actors = await Actor.find();

  response.render("actors/index", {
    username: request["oidc"].user,
    title: "All Actors",
    page_name: "actors",
    actors: actors,
  });
}

export async function show(request: Request, response: Response) {
  try {
    const actor = await Actor.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    response.render("actors/show", {
      username: request["oidc"].user,
      title: "Actor",
      page_name: "actors",
      actor,
    });
  } catch (e) {
    response.redirect("/");
  }
}

export async function newActor(request: Request, response: Response) {
  response.render("actors/new", {
    username: request["oidc"].user,
    title: "New Actor",
    page_name: "actors",
    actor: new Actor(),
  });
}

export async function create(request: Request, response: Response) {
  const username = request["oidc"].user;
  const { name, published } = request.body;
  const actor = new Actor();
  actor.name = name;
  actor.userMail = username.name;
  actor.published = published;
  await actor.save();

  response.redirect("/actors");
}

export async function edit(request: Request, response: Response) {
  try {
    const actor = await Actor.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    response.render("actors/edit", {
      username: request["oidc"].user,
      title: "Edit Actor",
      page_name: "actors",
      actor,
    });
  } catch (e) {
    response.redirect("/");
  }
}

export async function update(request: Request, response: Response) {
  try {
    const actor = await Actor.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    const username = request["oidc"].user;
    const { name, published } = request.body;
    actor.name = name;
    actor.userMail = username.name;
    actor.published = published === "on" ? true : false;
    await actor.save();
    response.redirect(`/actors/${actor.id}`);
  } catch (e) {
    response.redirect("/");
  }
}

export async function destroy(request: Request, response: Response) {
  try {
    const actor = await Actor.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    await actor.remove();

    response.redirect("/actors");
  } catch (e) {
    response.redirect("/");
  }
}
