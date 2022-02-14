import { ShowActor } from "./../../entity/ShowActor";
import { Request, Response } from "express";
import { getManager, Equal, Like } from "typeorm";
import { Actor } from "../../entity/Actor";
import { actors } from "./../../routes/actors";

export async function index(request: Request, response: Response) {
  const showActors = await Actor.find({
    where: [{ published: true }],
  });

  response.render("showActors/index", {
    username: request["oidc"].user,
    title: "All Actors",
    page_name: "showActors",
    showActors,
  });
}

export async function show(request: Request, response: Response) {
  try {
    const showActor = await ShowActor.find();
    response.render("showActors/show", {
      username: request["oidc"].user,
      title: "ShowActor",
      page_name: "showActors",
      showActor,
    });
  } catch (e) {
    response.redirect("/");
  }
}

export async function newShowActor(request: Request, response: Response) {
  const showActor = new ShowActor();
  const actors = await Actor.find({ select: ["id", "name"] });
  response.render("showActors/new", {
    username: request["oidc"].user,
    title: "New ShowActor",
    page_name: "showActors",
    showActor,
    actors,
  });
}

export async function create(request: Request, response: Response) {
  const username = request["oidc"].user;
  const { comment, actors } = request.body;
  const showActor = new ShowActor();
  showActor.comment = comment;
  showActor.userMail = username.name;
  showActor.actors = await Actor.findByIds(actors);

  await showActor.save();

  response.redirect("/showActors");
}

export async function edit(request: Request, response: Response) {
  try {
    const actors = await Actor.find({ select: ["id", "name"] });
    const showActor = await ShowActor.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    response.render("showActors/edit", {
      username: request["oidc"].user,
      title: "Edit ShowActor",
      page_name: "showActors",
      showActor,
      actors,
    });
  } catch (e) {
    response.redirect("/");
  }
}

export async function update(request: Request, response: Response) {
  try {
    const showActor = await ShowActor.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    const username = request["oidc"].user;
    const { comment, actors } = request.body;
    showActor.comment = comment;
    showActor.userMail = username.name;
    showActor.actors = await Actor.findByIds(actors);
    await showActor.save();
    response.redirect(`/showActors/${showActor.id}`);
  } catch (e) {
    response.redirect("/");
  }
}

export async function destroy(request: Request, response: Response) {
  try {
    const showActor = await ShowActor.findOneOrFail(request.params.id, {
      where: [{ userMail: request["oidc"].user.name }],
    });
    await showActor.remove();
    response.redirect("/showActors");
  } catch (e) {
    response.redirect("/");
  }
}
