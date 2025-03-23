import { TabSchema } from "./tabSlice";

export const collections = [
  {
    id: "col-d33df",
    name: "Hobby project rest",
    requests: [
      new TabSchema({ name: "Signup Api", method: "post", coll_id: "col-d33df" }),
      new TabSchema({ name: "Login Api", method: "get", coll_id: "col-d33df" }),
      new TabSchema({ name: "Delete user", method: "delete", coll_id: "col-d33df" }),
      new TabSchema({ name: "Change user setting", method: "put", coll_id: "col-d33df" }),
    ],
  },
  {
    id: "col-123df",
    name: "My Awsome Collection",
    requests: [
      new TabSchema({ name: "Signup Api", method: "post", coll_id: "col-123df" }),
      new TabSchema({ name: "Login Api", method: "get", coll_id: "col-123df" }),
      new TabSchema({ name: "Delete user", method: "delete", coll_id: "col-123df" }),
    ],
  },
  {
    id: "col-1c3df",
    name: "My Awsome Collection which has a very long fuckin name",
    requests: [
      new TabSchema({ name: "Signup Api with super duper long name what you gonna do. ", method: "post", coll_id: "col-123df" }),
      new TabSchema({ name: "Login Api", method: "get", coll_id: "col-123df" }),
      new TabSchema({ name: "Delete user", method: "delete", coll_id: "col-123df" }),
    ],
  },
];
