const http = require('http');
const fs = require('fs');

// Modulos creados

const movies = require('./modulos/movies');
const faqs = require('./modulos/faqs');
const theaters = require('./modulos/theaters');

function nombresPelis(){
	let nomPelis = [];
	for(i=0; i<movies.length; i++){
		nomPelis.push(' '+movies[i].original_title);
	}
	return(nomPelis.sort());
    }	    
    nombresPelis();
	
// Servidor
http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/HTML; charset=utf-8' });
	
	// Route System
	switch (req.url) {
		// Home
		case '/':
			res.end(`Título​: ​Bienvenidos a DH Movies el mejor sitio para encontrar las mejores
            películas, incluso mucho mejor que Netflix, Cuevana y PopCorn​.
            b. Total de películas en cartelera​: ${ movies.length }
            c. Listados de películas:${nombresPelis()}
            d. Pié de página​: ​Recordá que podés visitar las secciones:
            i. En Cartelera
            ii. Más Votadas
            iii. Sucursales
            iv. Contacto
            v. Preguntas Frecuentes`);
			break;
		// En cartelera
		case '/en-cartelera':
			res.end('En cartelera');
			break;
		case '/mas-votadas':
			res.end('Más Votadas');
			break;
		case '/sucursales':
			res.end('Sucursales');
			break;
		case '/contacto':
			res.end('Contacto');
			break;
		case '/preguntas-frecuentes':
			res.end('Preguntas Frecuentes');
			break;
		default:
			res.end('404 not found')
	}
}).listen(3030, 'localhost', () => console.log('Server running in 3030 port'));