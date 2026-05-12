# mapdraw v2

A modern rewrite of my map drawing application.

DB Commands:

pgsql mapdraw

# kill the db

\c postgres
DROP DATABASE mapdraw WITH (FORCE);
CREATE DATABASE mapdraw;

# push schema without migration

npx drizzle-kit push

# run schema

npm run db:seed

# run drizzle kit.

npx drizzle-kit generate
npx drizzle-kit migrate
