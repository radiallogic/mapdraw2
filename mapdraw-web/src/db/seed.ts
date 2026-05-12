import * as schema from "./schema";
import db from "./index";
import { seed } from "drizzle-seed";

const main = async () => {
  await seed(db, schema).refine((funcs) => ({
    users: {
      count: 100,
      columns: {
        id: funcs.intPrimaryKey(),
        name: funcs.fullName(),
        email: funcs.email(),
      },
    },
    trips: {
      count: 1000,
      columns: {
        id: funcs.intPrimaryKey(),
        name: funcs.string(),
      },
    },
    routes: {
      count: 25,
      columns: {
        id: funcs.intPrimaryKey(),
        json: funcs.json(),
      },
    },
    sites: {
      count: 25,
      columns: {
        id: funcs.intPrimaryKey(),
        name: funcs.string(),
      },
    },
  }));
};
main();
