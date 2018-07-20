# mb-world-map

## What's this?

Mapping music releases in the world by genre, to GoogleMaps.

Using of MusicBrainz database dump. (MusicBrainz WebAPI does not handle some kinds of data we need.)

[See Screencast](https://i.giphy.com/media/1TSHxT6gIDxXO5DtJK/giphy.gif)


## Development

### 1. Setup Music Brainz Database Clone on your machine

I used awesome dockerimage - [arey/musicbrainz-database](https://github.com/arey/musicbrainz-database)

Database connection should be configured to:

```typescript
const config = {
  host: "localhost",
  port: 5432,
  database: "musicbrainz",
  user: "musicbrainz",
  password: "musicbrainz"
}
```

### 2. Set API(GoogleMapsAPI) key

In app.module.ts, you can set your API key.(Sorry for hard coding :sweat:)

```typescript
@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({ apiKey: 'API_KEY_HERE' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### 3. Install dependencies and start :rocket:

```zsh
# (cd app)
cd api
yarn install && yarn start
```
