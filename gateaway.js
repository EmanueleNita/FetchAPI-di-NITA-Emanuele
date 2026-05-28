// URL base del server: tutte le rotte vengono costruite a partire da questo
// Cambia solo questa costante se il backend si sposta
const API_BASE = "api.php";

// Si occupa solo di mandare la richiesta HTTP e restituire i dati JSON già parsati.
async function _fetch(rotta) {
    // Costruisco l'URL completo unendo la base con la rotta specifica
    // Esempio: "api.php" + "/" + "tutti" = "api.php/tutti"
    const url = `${API_BASE}/${rotta}`;

    // Mando la richiesta GET al server e aspetto la risposta
    const risposta = await fetch(url);

    // Trasformo il corpo della risposta da testo JSON a oggetto JavaScript
    const dati = await risposta.json();

    // Se il server ha risposto con un codice di errore (es. 404, 500)
    // risposta.ok vale false = lancio un'eccezione con il messaggio del server
    if (!risposta.ok) {
        throw new Error(dati.errore || "Errore sconosciuto dal server");
    }

    // Se tutto è andato bene, restituisco i dati al chiamante
    return dati;
}

// Recupera tutti i film presenti nel database
// Chiama la rotta GET /api.php/tutti
async function getTuttiIFilm() {
    // Delego il lavoro a _fetch() passando il nome della rotta
    return await _fetch("tutti");
}

// Recupera solo i film con cast numeroso (10+ attori)
// Chiama la rotta GET /api.php/recenti
async function getFilmConCastNumeroso() {
    // Stessa cosa, rotta diversa
    return await _fetch("recenti");
}