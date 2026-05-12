import { faker } from "@faker-js/faker";
import * as schema from "./schema";
import db from "./index";
import { reset } from "drizzle-seed";

const randomLocation = () => ({
  lat: faker.location.latitude(),
  lng: faker.location.longitude(),
});

const randomPath = () =>
  Array.from({ length: faker.number.int({ min: 2, max: 8 }) }, () => ({
    lat: faker.location.latitude(),
    lng: faker.location.longitude(),
  }));

const main = async () => {
  await reset(db, schema);

  const insertedUsers = await db
    .insert(schema.users)
    .values(
      Array.from({ length: 100 }, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      })),
    )
    .returning();

  const insertedTrips = await db
    .insert(schema.trips)
    .values(
      Array.from({ length: 1000 }, () => ({
        name: `${faker.word.adjective()} ${faker.word.noun()}`,
        userId: faker.helpers.arrayElement(insertedUsers).id,
        zoom: faker.number.int({ min: 1, max: 18 }),
        vehicle: faker.word.noun(),
        // Leave this out if your DB has a default value
        // location: randomLocation(),
      })),
    )
    .returning();

  await db.insert(schema.routes).values(
    Array.from({ length: 25 }, () => ({
      paths: randomPath(),
      tripId: faker.helpers.arrayElement(insertedTrips).id,
    })),
  );

  await db.insert(schema.sites).values(
    Array.from({ length: 25 }, () => ({
      name: faker.location.city(),
      tripId: faker.helpers.arrayElement(insertedTrips).id,

      // Leave this out if your DB has a default value
      // location: randomLocation(),

      text: faker.lorem.paragraph(),
    })),
  );
};

main()
  .then(() => {
    console.log("Seed complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seed failed", err);
    process.exit(1);
  });
