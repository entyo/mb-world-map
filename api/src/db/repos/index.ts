import { CountriesRepository } from "./countries";
import { ReleasesRepository } from "./releases";

// Database Interface Extensions:
interface IExtensions {
  releases: ReleasesRepository;
  countries: CountriesRepository;
}

export { IExtensions, ReleasesRepository, CountriesRepository };
