import { Request, Response } from "express";

export async function index(request: Request, response: Response) {
  response.render("index", {
    username: request["oidc"].user,
    title: "Dashboard",
    page_name: "dashboard",
  });
}
