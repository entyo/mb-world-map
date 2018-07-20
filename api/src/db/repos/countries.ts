import { IDatabase, ITask } from "pg-promise";

export class CountriesRepository {
  // constructor(db: any, pgp: IMain) {
  constructor(db: any) {
    this.db = db;
    // this.pgp = pgp; // library's root, if ever needed;
  }

  // if you need to access other repositories from here,
  // you will have to replace 'IDatabase<any>' with 'any':
  private db: IDatabase<any>;

  // Returns all product records;
  all() {
    return this.db.task((t: ITask<any>) => {
      return t
        .many("SELECT * FROM country_area")
        .then(cas => {
          const countryIds = cas.map(ca => ca.area);
          console.log(countryIds);
          return t
            .many("SELECT id,name FROM area")
            .then(areas => {
              console.log(areas);
              console.log(areas.filter(area => countryIds.includes(area.id)));
              return areas.filter(area => countryIds.includes(area.id));
            })
            .catch(e => console.error(e));
        })
        .catch(e => console.error(e));
    });
  }
}
