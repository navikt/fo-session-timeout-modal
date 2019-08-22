## Informasjonsmelding når sesjon utløper

Brukes i NAV FO frontend applikasjoner for å vise informasjonsmelding 5 minutter før sesjon utløper.

### Installering

`npm i fo-session-timeout-modal --save` 

`import TimeoutModal from fo-session-timeout-modal/dist/TimeoutModal`

`<TimeoutModal/>`

#### Test:

`<TimeoutModal visDemo={true}/>`

### Funksjonalitet

Komponenten gjør et fetch kall mot /api/auth og sjekker `remainingSeconds`.

"Bilde console log"

### `Utvikling`

`npm start`

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles via issues her på github.

# For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #område-arbeid-pilot
