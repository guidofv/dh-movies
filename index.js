const http = require('http');
const fs = require('fs');

// Modulos creados

let movies = require('./modulos/movies');
const faqs = require('./modulos/faqs');
const theaters = require('./modulos/theaters');

	
// Servidor
http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/HTML; charset=utf-8' });
	
	// Route System
	switch (req.url) {
		// Home
		case '/':
			movies = movies.sort(function(a,b){
				if (a.title > b.title){
					return 1;
				} else {
					if (a.title < b.title){
						return -1;
					} else {
						return 0;
					}
				}
			});

			let titlesAZ = ``
			for(let i = 0; i<movies.length; i++){
			titlesAZ += `<li> ${movies[i].title}`;
}

			let contenido = `
			Bienvenidos a DH Movies el mejor sitio para encontrar las mejores
			películas, incluso mucho mejor que Netflix, Cuevana y PopCorn​.<hr>
			Total de películas en cartelera: ${movies.length}<br>
			Listados de películas: ${titlesAZ}<br>
			<br>
			Recordá que podés visitar las secciones:
            i. <a href=./en-cartelera>En Cartelera</a>
            ii. <a href=./mas-votadas>Más Votadas</a>
            iii. <a href=./sucursales>Sucursales</a> 
            iv. <a href=./contacto>Contacto</a>
            v. <a href=./preguntas-frecuentes>Preguntas Frecuentes</a>);
			`

			res.end(contenido);
			break;

		// En cartelera
		case '/en-cartelera':
	
			res.end(`
			<b>En Cartelera</b>
			Total de películas : ${movies.length} <br>
			Título y reseña:
			c. Listados de películas. Para cada película mostrar:
			`);
			break;
		case '/mas-votadas':
				
			let valoraciones = movies.map(function(elemento){
				return elemento.vote_average;
			})
			
			let rankingsAltos = valoraciones.filter(function(numero){
				return numero >= 7;
			})

			let sumaRankingsAltos = rankingsAltos.reduce(function(estado,numero){
				return estado + numero;
			})

			let promedioRatingsAltos = sumaRankingsAltos/rankingsAltos.length;

			res.end(`
			Más Votadas <br>
			Cantidad: ${rankingsAltos.length} <br>
			Rating promedio: ${promedioRatingsAltos}`);
			break;
		case '/sucursales':
			res.end(`
			Nuestras salas:<br>
			Total de salas: ${theaters.length}`);
			break;
		case '/contacto':
			res.end(`
			Contáctanos <br>
			¿Tenés algo para contarnos? Nos encanta escuchar a nuestros
clientes. Si deseas contactarnos podés escribirnos al siguiente email:
dhmovies@digitalhouse.com o en las redes sociales. Envianos tu consulta,
sugerencia o reclamo y será respondido a la brevedad posible. Recordá que
también podes consultar la sección de Preguntas Frecuentes para obtener
respuestas inmediatas a los problemas más comunes.`);
			break;
		case '/preguntas-frecuentes':
			res.end(`
			Preguntas Frecuentes<br>
			Total de preguntas: ${faqs.length} <br>
			Listados de preguntas:
		
			`);
			break;
		default:
			res.end('404 not found')
	}
}).listen(3030, 'localhost', () => console.log('Server running in 3030 port'));