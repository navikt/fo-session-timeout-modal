import React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './TimeoutModal.css';

export const getCookie = name => {
    const re = new RegExp(`${ name }=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

function getHeaders() {
    return new Headers({
        'Content-Type': 'application/json',
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'),
    });
}

const MED_CREDENTIALS = {
    credentials: ('same-origin')
};

class TimeoutModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            skalVise: false,
        };
    }

    componentDidMount() {
        fetch(this.props.authUrl || '/api/auth',
            {
                ...MED_CREDENTIALS,
                headers: getHeaders(),
            })
            .then(response => {
                return response.json();
            })
            .then(authExp => {
                const { remainingSeconds } = authExp;

                if (remainingSeconds) {
                    const expirationInMillis = this.utloptTidspunktMinusFemMinutter(remainingSeconds);
                    const expiresAt = new Date().getTime() + expirationInMillis;
                    // SetTimeout til å vise informasjon melding når sesjon er utløpt
                    setTimeout(() => {
                        this.setState({
                            skalVise: true
                        });
                    }, expirationInMillis);

                    // I tilfelle pc/nettleseren går i Dvale modus:
                    // Når pc/nettleseren går i dvale modus så lenge at sesjonen utløper, så vil SetTimeout ikke
                    // fungere. Bruker derfor mousedown event + sjekk om sesjonen er utløpt, og sørger for at meldingen
                    // vises med en gang bruker prøver å gjøre noe.
                    document.addEventListener('mousedown', () => {
                        const hasExpired = new Date().getTime() >= expiresAt;
                        this.setState({
                            skalVise: hasExpired
                        });
                    });
                }
            })
            .catch((error) => {
                console.error(error); // tslint:disable-line
            })
    }

    utloptTidspunktMinusFemMinutter(remainingSeconds) {
        return (remainingSeconds - 300) * 1000;
    }

    render() {
        const skalVise = this.state.skalVise || this.props.visDemo;
        return (
            <NavFrontendModal
                isOpen={skalVise}
                className="timeoutbox-modal"
                contentLabel="Blir logget ut"
                shouldCloseOnOverlayClick={false}
                closeButton={false}
                onRequestClose={() => false}
            >
                <Veilederpanel
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="25 10 47 85">
                            <path fill="#515658"
                                  d="M68.609 25.398H30.507c-1.573 0-2.845 1.284-2.845 2.871v48.488a2.88 2.88 0 0 0 1.038 2.214 2.815 2.815 0 0 0 1.807.656h38.102c1.572 0 2.846-1.286 2.846-2.87V28.269c0-1.587-1.274-2.871-2.846-2.871"/>
                            <path fill="#FFF"
                                  d="M31.186 35.997v37.305a2.397 2.397 0 0 0 2.388 2.408h31.968a2.397 2.397 0 0 0 2.388-2.408V30.47c0-1.33-1.07-2.408-2.388-2.408H39.497l-8.311 7.935z"/>
                            <path fill="#C0C0BE"
                                  d="M39.497 28.063v5.524a2.399 2.399 0 0 1-2.387 2.41h-5.924l8.311-7.934z"/>
                            <path fill="#2F3237"
                                  d="M49.56 26.746a.923.923 0 0 1-.922-.927c0-.514.412-.93.921-.93.507 0 .92.416.92.93a.924.924 0 0 1-.92.927m5.688-3.796h-3.428v-.639a2.27 2.27 0 0 0-2.26-2.279 2.27 2.27 0 0 0-2.262 2.28v.638H43.87c-1.69 0-3.06 1.382-3.06 3.086v3.712h17.497v-3.712c0-1.704-1.371-3.086-3.06-3.086"/>
                            <path
                                d="M53.634 52.768v2.898H45.35V38.007h8.284v2.898zM49.601 68.83c2.763 0 5.003-2.257 5.003-5.042 0-2.786-2.24-5.044-5.003-5.044s-5.003 2.258-5.003 5.044c0 2.785 2.24 5.043 5.003 5.043"
                                fill="#515658"/>
                        </svg>
                    }
                    type="plakat"
                    kompakt={true}
                >
                    <div className="timeoutbox-nedtelling">
                        <Systemtittel className="timeoutbox-modal__tittel">
                            Sesjonen din har utløpt
                        </Systemtittel>
                        <Normaltekst className="timeoutbox-modal__beskrivelse">
                            Du må starte på nytt for å fortsette.
                        </Normaltekst>
                        <Hovedknapp
                            className="timeoutbox-modal__knapp"
                            onClick={
                                () => {
                                    window.location.reload();
                                }
                            }
                        >
                            Start på nytt
                        </Hovedknapp>
                    </div>
                </Veilederpanel>
            </NavFrontendModal>
        );
    }
}

export default TimeoutModal;
