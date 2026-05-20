<?php
// Dico al browser che la risposta sarà in formato JSON
header("Content-Type: application/json");
// Permetto a qualsiasi sito di chiamare questa API (utile per fare test)
header("Access-Control-Allow-Origin: *");

// Creo un array di film (questo è il mio "database" simulato)
// Ogni film ha id, titolo, regista e numero di attori nel cast
$film = [
    ["id" => 1, "titolo" => "Militare la mia esperienza", "regista" => "Kolozi San", "cast" => 12],
    ["id" => 2, "titolo" => "Da nero a bianco", "regista" => "Michele Jackson", "cast" => 8],
    ["id" => 3, "titolo" => "Come si diventa traditori", "regista" => "Cardinale Nicola", "cast" => 15],
    ["id" => 4, "titolo" => "Tutorial FLstudio", "regista" => "The Big League", "cast" => 5]
];

// $_SERVER['PATH_INFO'] contiene quello che l'utente scrive dopo /api.php/
// Se chiamano solo /api.php, PATH_INFO è vuoto
// ?? '/tutti' significa: se PATH_INFO non esiste, usa '/tutti' come valore predefinito
$percorso = $_SERVER['PATH_INFO'] ?? '/tutti';

switch($percorso) {
    
    // Caso: l'utente ha chiamato /api.php/tutti
    case '/tutti':
        // json_encode() trasforma l'array PHP in una stringa JSON
        echo json_encode($film);
        break; // Esco dallo switch
    
    // Caso: l'utente ha chiamato /api.php/recenti
    case '/recenti':
        // array_filter() scorre tutti i film uno per uno
        // Per ogni film, la funzione decide se tenerlo (true) o scartarlo (false) qui tengo solo i film con cast maggiore o uguale a 10 attori
        $filtrati = array_filter($film, function($f) {
            return $f['cast'] >= 10;
        });
        
        // array_values() riorganizza gli indici dell'array
        $filtrati = array_values($filtrati);
        
        // Trasformo in JSON e lo mando al browser
        echo json_encode($filtrati);
        break;
    
    // Caso predefinito: l'utente ha chiamato una rotta che non esiste
    default:
        // http_response_code(404) manda il codice HTTP "Non Trovato"
        http_response_code(404);
        
        // Mando un messaggio di errore in JSON
        echo json_encode(["errore" => "Rotta non trovata"]);
        break;
}
?>