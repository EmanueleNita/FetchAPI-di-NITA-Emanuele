// rotta è il parametro che riceve (può essere 'tutti' o 'recenti')
async function chiamaAPI(rotta) {
    // Trovo il div con id="display" nella pagina HTML
    const display = document.getElementById('display');
    
    // Mostro un messaggio di caricamento mentre aspetto la risposta del server
    display.innerHTML = '<div class="loading">Caricamento in corso...</div>';

    try {
        // Uso i backtick ` per creare la stringa
        // ${rotta} viene sostituito con il valore della variabile rotta
        const url = `api.php/${rotta}`;
        
        // fetch() manda la richiesta HTTP al server
        // await aspetta che la risposta arrivi
        const risposta = await fetch(url);
        
        // .json() legge la risposta del server e la trasforma in oggetto JavaScript
        const dati = await risposta.json();

        // risposta.ok è una proprietà che vale true se il server ha risposto con successo
        // Se il server ha risposto con 404 (non trovato), ok vale false
        if (!risposta.ok) {
            // Lancio un errore con il messaggio ricevuto dal server
            // Se dati.errore non esiste, uso "Errore sconosciuto"
            throw new Error(dati.errore || "Errore sconosciuto");
        }

        // Controllo quale rotta è stata chiamata e metto il titolo giusto
        if (rotta === 'tutti') {
            display.innerHTML = '<div class="titolo-sezione">Tutti i Film</div>';
        } else if (rotta === 'recenti') {
            display.innerHTML = '<div class="titolo-sezione">Film con Cast Numeroso (10+ attori)</div>';
        }
        
        // dati.length è il numero di film ricevuti
        if (dati.length === 0) {
            // Se non ci sono film, mostro un messaggio
            display.innerHTML += "<p>Nessun film trovato.</p>";
        } else {
            // forEach esegue una funzione per ogni film nell'array dati film è l'elemento corrente del ciclo
            dati.forEach(film => {
                // += significa "aggiungi questo contenuto a quello che c'è già"
                display.innerHTML += `
                    <div class="film">
                        <strong>${film.titolo}</strong>
                        <small>Regista: ${film.regista} · Cast: ${film.cast} attori</small>
                    </div>
                `;
            });
        }
    } catch (err) {
        // Se qualcosa va male arrivo qui dentro. err.message contiene la descrizione dell'errore
        display.innerHTML = `<div class="error">Errore: ${err.message}</div>`;
    }
}