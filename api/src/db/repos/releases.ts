import { IDatabase, ITask } from "pg-promise";

export class ReleasesRepository {
  // constructor(db: any, pgp: IMain) {
  constructor(db: any) {
    this.db = db;
    // this.pgp = pgp; // library's root, if ever needed;
  }

  // if you need to access other repositories from here,
  // you will have to replace 'IDatabase<any>' with 'any':
  private db: IDatabase<any>;
  // private pgp: IMain;

  // Tries to find a user product from user id + product name;
  getNReleasesOfGenreByCountry(genre: string) {
    return this.db.task((t: ITask<any>) => {
      return t
        .oneOrNone("SELECT id, name FROM tag WHERE name = $1", genre)
        .then((tag: { id: number; name: string }) => {
          return t
            .manyOrNone(
              "SELECT release,tag FROM release_tag WHERE tag = $1",
              tag.id
            )
            .then(rts => {
              const ids = rts.map(rt => rt.release);
              // ここめっちゃメモリ食いそう
              // Promise.allで書いたら遅かった
              return t.many("SELECT id, name FROM release").then(releases => {
                const allReleaseIdsOnTheGenre = releases
                  .filter(release => ids.includes(release.id))
                  .map(release => release.id);
                return t.many("SELECT * FROM country_area").then(cas => {
                  return t
                    .many("SELECT release,country FROM release_country")
                    .then(rcs => {
                      const cIds = cas.map(ca => ca.area);
                      const initialV = cIds.reduce(
                        (a, c) => Object.assign(a, { [c]: 0 }),
                        {}
                      );
                      const res = rcs
                        .filter(rc =>
                          allReleaseIdsOnTheGenre.includes(rc.release)
                        )
                        .reduce(
                          (a, c) =>
                            Object.assign(a, { [c.country]: a[c.country] + 1 }),
                          initialV
                        );
                      console.log("res", res);
                      return res;
                    });
                });
              });
            })
            .catch(e => console.error(e));
        });
    });
  }
}
