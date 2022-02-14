import * as showActor from "../controller/admin/ShowActorsController";

export const showActors = [
  {
    path: "/showActors",
    method: "get",
    action: showActor.index,
  },
  {
    path: "/showActors/new",
    method: "get",
    action: showActor.newShowActor,
  },
  {
    path: "/showActors",
    method: "post",
    action: showActor.create,
  },
  {
    path: "/showActors/:id",
    method: "get",
    action: showActor.show,
  },
  {
    path: "/showActors/:id/edit",
    method: "get",
    action: showActor.edit,
  },
  {
    path: "/showActors/:id",
    method: "put",
    action: showActor.update,
  },
  {
    path: "/showActors/:id",
    method: "delete",
    action: showActor.destroy,
  },
];
