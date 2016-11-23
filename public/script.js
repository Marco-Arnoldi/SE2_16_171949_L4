
var visibile = false;

/**
 * @brief Funzione per sesettare i campi de form di input
 */

function reset()
{
    document.getElementById("input_id").value = null;
    document.getElementById("input_nome").value = null;
    document.getElementById("input_cognome").value = null;
    document.getElementById("input_livello_stipendio").value = null;
}

/**
 * @brief Funzione che rende visibile e invisibile e chiama reset
 */

function visibile_invisibile()
{
    if(visibile)
    {
        form_input_dipendenti.style.display ='none';
        visibile = false;
    }
    else
    {
        form_input_dipendenti.style.display ='block';
        visibile = true;
    }
    
    reset();
}
