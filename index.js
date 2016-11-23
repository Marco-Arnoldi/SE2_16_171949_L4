// variabile per tenere traccia il numero di dipendenti
var numero_dipendenti = 0;
// lista per inserire i dipendenti
var lista_dipendenti = [];
// tenere tracci id piu grande cosi se faccio id+1 sicuramente non è gia presente
var id_max = 0;
// booleano per sapere se un dipendente è gia presente
var dipendente_presente = false;
// posizione della lista di un dipendete gia presete
var posizione_dipendente_presente;
//express lib
var express = require('express');
//inspect
var util = require('util');
//instantiate express
var app = express();
//POST
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
//for templates
var bind = require('bind');

var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 1337));

app.use(express.static(__dirname+'/public'));

app.get('/client',function(request, response)
{
   response.sendFile(__dirname +'/client.html'); 
});

/**
 * @brief Aggiungo dipendenti alla lista dipendenti e se sono gia presenti vengono modificati i valori
 */

app.post('/client', urlencodedParser ,function(request, response) 
{
    // variabile che contiene i vari campi di input per 
    var dipendente =
        {
        id:null, 
        nome:null, 
        cognome:null,
        livello_stipendio: null
        };

    //set the headers of the responce
    var headers = {};
    //answer
    headers["Content-Type"] = "text/html";
    response.writeHead(200, headers);
    dipendente_presente = false;
    var myReadStream = fs.createReadStream(__dirname+'/client.html','utf8');
    
    if(numero_dipendenti == 0)
    {
        if ( typeof request.body.input_id !== 'undefined' && request.body.input_id)
        {
            dipendente.id = request.body.input_id;
            if(dipendente.id >= id_max)
            {
                id_max = (+dipendente.id) +1;
            }     
        }
        else
        {
            dipendente.id = (+id_max) + 1;
            id_max = (+id_max) + 1;
        }
        
        ///////////////////////////////////////////////////////////////////////////    
        if ( typeof request.body.input_nome !== 'undefined' && request.body.input_nome)
        {
            dipendente.nome = request.body.input_nome; 
        }
            
        else
        {
            console.log("Manca nome");
            myReadStream.pipe(response);
        }
        //////////////////////////////////////////////////////////////////////////////       
        
        if ( typeof request.body.input_cognome !== 'undefined' && request.body.input_cognome)
        {
            dipendente.cognome = request.body.input_cognome;
        }
            
        else
        {
            console.log("Manca cognome");
            myReadStream.pipe(response);    
        }
        
        ///////////////////////////////////////////////////////////////////////////

        if ( typeof request.body.input_livello_stipendio !== 'undefined' && request.body.input_livello_stipendio)
        {
            dipendente.livello_stipendio = request.body.input_livello_stipendio;
        }
            
        else
        {
            console.log("Manca livello stipendio");
            myReadStream.pipe(response);
        }
        
        /////////////////////////////////////////////////////////////////////////////////////
        
        lista_dipendenti[numero_dipendenti] = dipendente;
        numero_dipendenti = numero_dipendenti +1;
        
        console.log("ID dipendente: "+dipendente.id);
        console.log("Dimensione lista dipendenti: "+lista_dipendenti.length);
        
        console.log("/////////////////////////////////////////////////////");
        
        myReadStream.pipe(response);    
            
    }
    else
    {
        /////////////////////////////////////////////////////////////////////////////////////
        
        if ( typeof request.body.input_id !== 'undefined' && request.body.input_id)
        {
            dipendente.id = request.body.input_id;
            
            if(dipendente.id >= id_max)
            {
                id_max = (+dipendente.id) +1;
            }
            
            console.log("Inizio confronto");
            for( var i = 0; i < numero_dipendenti; i++ )
            {
                //console.log("iterazione: "+i);
                //var a = lista_dipendenti[i];
                //console.log(a);
                //console.log(a.id);
                //console.log("Confronto tra "+a.id+"e "+dipendente.id);
                if(lista_dipendenti[i].id == dipendente.id)
                {
                    dipendente_presente = true;
                    posizione_dipendente_presente = i;
                    console.log("Dipendente presente");
                }
            }
            console.log("Fine confronto");
        }
            
        else
        {
            dipendente.id = (+id_max) + 1;
            id_max = (+id_max) + 1;
        }
        
        /////////////////////////////////////////////////////////////////////////   
        if ( typeof request.body.input_nome !== 'undefined' && request.body.input_nome)
        {
            if(dipendente_presente)
            {
                lista_dipendenti[posizione_dipendente_presente].nome = request.body.input_nome;
            }
            
            else
            {
                dipendente.nome = request.body.input_nome;
            }
            
        }      
        else
        {
            console.log("Manca nome");
            myReadStream.pipe(response);  
        } 
        
        //////////////////////////////////////////////////////////////////////////////////////// 
        
        if ( typeof request.body.input_cognome !== 'undefined' && request.body.input_cognome)
        {
            if(dipendente_presente)
            {
                lista_dipendenti[posizione_dipendente_presente].cognome =  request.body.input_cognome;
            }
            else
            {
                dipendente.cognome = request.body.input_cognome; 
            }  
        }
            
        else
        {
            console.log("Manca cognome");
            myReadStream.pipe(response);   
        }  
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        
        if ( typeof request.body.input_livello_stipendio !== 'undefined' && request.body.input_livello_stipendio)
        {
            if(dipendente_presente)
            {
                lista_dipendenti[posizione_dipendente_presente].livello_stipendio =  request.body.input_livello_stipendio;
            }
            else
            {
                dipendente.livello_stipendio = request.body.input_livello_stipendio;
            }
        }          
        else
        {
            console.log("Manca livello stipendio");
            myReadStream.pipe(response);
        }
        
        /////////////////////////////////////////////////////////////////////////////////////////////
        
        if(dipendente_presente)
        {
            lista_dipendenti[dipendente_presente] = dipendente;
            
        }     
        else
        {
            lista_dipendenti[numero_dipendenti] = dipendente;
            numero_dipendenti = (+numero_dipendenti) +1;     
        }
        
        console.log("Lista dipendenti :")
        
        for(var i = 0; i < numero_dipendenti; i++)
        {
            console.log(lista_dipendenti[i]);
            console.log("");
        }
        
        console.log("Dimensione lista dipendenti: "+lista_dipendenti.length);
        console.log("/////////////////////////////////////////////////////");
        
        myReadStream.pipe(response);   
     }
});

/**
 * @brief Controlla se un dipendente è presente se lo è lo mostra sulla pagina
 */

app.post('/cerca_dipendente', urlencodedParser ,function(request, response)
{
    var myReadStream = fs.createReadStream(__dirname+'/client.html','utf8');
    var id_da_cercare = null;
    var appoggio;
    if ( typeof request.body.id_cerca_dipendente !== 'undefined' && request.body.id_cerca_dipendente)
    {
        id_da_cercare = request.body.id_cerca_dipendente;
        console.log("id da cercare: "+id_da_cercare);
    }          
    else
    {
        myReadStream.pipe(response);  
    }
    
    for(var i = 0; i < numero_dipendenti ;i++)
    {
        
        if(id_da_cercare == lista_dipendenti[i].id)
        {
            console.log("ID presente");
            console.log("");
            console.log(lista_dipendenti[i]); 
        }
    }
    console.log("/////////////////////////////////////////////////////");
    myReadStream.pipe(response);        
});

/**
 * @brief Prende un id e controlla se è presente tale dipendente se lo è lo cancella altrimenti nulla .
 */

app.post('/cancella_dipendente', urlencodedParser ,function(request, response)
{
    var myReadStream = fs.createReadStream(__dirname+'/client.html','utf8');
    var id_da_cancellare = null;
    
    if ( typeof request.body.id_cancella_dipendente !== 'undefined' && request.body.id_cancella_dipendente)
    {
        id_da_cancellare = request.body.id_cancella_dipendente;
        console.log("id da cancellare: "+id_da_cancellare);
    }          
    else
    {
        myReadStream.pipe(response);  
    }
    console.log("Lista dipendenti prima di canellare:")
    for(var i = 0; i < numero_dipendenti; i++)
    {
        console.log(lista_dipendenti[i]);
        console.log("");
    }
    console.log("dimensione lista dipendenti iniziale: "+lista_dipendenti.length);
    console.log("///////////////////////");
    for(var i = 0; i < numero_dipendenti ;i++)
    {
        
        if(id_da_cancellare == lista_dipendenti[i].id)
        {
            console.log("ID presente da cancellare");
            console.log(lista_dipendenti.length);
            lista_dipendenti.splice(i,1);
            numero_dipendenti = numero_dipendenti -1;
        }
    }
    
    console.log("Lista dipendenti dopo la cancellazione (se c'era): ")
    for(var i = 0; i < numero_dipendenti; i++)
    {
        console.log(lista_dipendenti[i]);
        console.log("");
    }
    console.log("dimensione finale lista: "+lista_dipendenti.length)
    console.log("/////////////////////////////////////////////////////");
    //numero_dipendenti = numero_dipendenti -1;
    myReadStream.pipe(response);
        
});

app.listen(app.get('port'), function() 
{
    console.log('Node app is running on port', app.get('port'));
});

