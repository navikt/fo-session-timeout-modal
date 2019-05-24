## Informasjonsmelding når sesjon utløper

Brukes i NAV FO frontend applikasjoner for å vise informasjonsmelding når sesjon utløper

### Installering
`npm i fo-session-timeout-modal --save` 

`import TimeoutModal from fo-session-timeout-modal/dist/TimeoutModal`

`<TimeoutModal/>`

#### Test:

`<TimeoutModal visDemo={true}/>`

### Funksjonalitet
Komponenten vil gjør fetch kall mot /api/auth

"Bilde console log"

### `Utvikling`
`npm start`