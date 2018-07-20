import { IMain, IDatabase, IOptions } from "pg-promise";
// Loading and initializing pg-promise:
import * as pgPromise from "pg-promise";

import { IExtensions, ReleasesRepository, CountriesRepository } from "./repos";
import { TConnectionParameters } from "pg-promise/typescript/pg-subset";

// pg-promise initialization options:
const initOptions: IOptions<IExtensions> = {
  // Extending the database protocol with our custom repositories;
  // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
  extend(obj: IExtensions) {
    // Database Context (dc) is mainly needed for extending multiple databases
    // with different access API.

    // Do not use 'require()' here, because this event occurs for every task
    // and transaction being executed, which should be as fast as possible.
    obj.countries = new CountriesRepository(obj);
    obj.releases = new ReleasesRepository(obj);
  }
};

// Database connection parameters:
const MB = "musicbrainz";
const config = {
  host: "localhost",
  port: 5432,
  database: MB,
  user: MB,
  password: MB
} as TConnectionParameters;

const pgp: IMain = pgPromise(initOptions);

// Create the database instance with extensions:
const db = <IDatabase<IExtensions> & IExtensions>pgp(config);

// If you ever need access to the library's root (pgp object), you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
export = db;
