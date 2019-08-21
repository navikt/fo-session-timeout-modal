## Informasjonsmelding når sesjon utløper

Brukes i NAV FO frontend applikasjoner for å vise informasjonsmelding når sesjon utløper.

Dersom klokken på klienten er feil vil informasjonsmeldingen gi beskjed om at klokken må stilles før ny sesjon startes.

### Installering

`npm i fo-session-timeout-modal --save` 

`import TimeoutModal from fo-session-timeout-modal/dist/TimeoutModal`

`<TimeoutModal/>`

#### Test:

`<TimeoutModal visDemo={true}/>`

### Funksjonalitet

Komponenten vil gjør fetch kall mot /api/auth og et kall mot https://worldtimeapi.org/api/ip for å sjekken klokken på klienten.

"Bilde console log"

### `Utvikling`

`npm start`

### Lisens

[MIT](LICENSE)
