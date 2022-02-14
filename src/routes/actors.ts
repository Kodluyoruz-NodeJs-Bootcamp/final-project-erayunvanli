import * as actor from "../controller/admin/ActorController";

export const actors = [
  {
    path: "/actors",
    method: "get",
    action: actor.index,
  },
  {
    path: "/actors/new",
    method: "get",
    action: actor.newActor,
  },
  {
    path: "/actors",
    method: "post",
    action: actor.create,
  },
  {
    path: "/actors/:id",
    method: "get",
    action: actor.show,
  },
  {
    path: "/actors/:id/edit",
    method: "get",
    action: actor.edit,
  },
  {
    path: "/actors/:id",
    method: "put",
    action: actor.update,
  },
  {
    path: "/actors/:id",
    method: "delete",
    action: actor.destroy,
  },
];
