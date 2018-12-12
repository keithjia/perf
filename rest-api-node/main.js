const restify = require('restify');
let people;

let server = restify.createServer();
server.use(restify.plugins.bodyParser());

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

function createPerson(req, res, next){
	people.push(req.body);
	res.send(people);
	next();
}

function getAllPeople(req, res, next){
	res.send(people);
	next();
}

function getPerson(req, res, next) {
	var found = people.find((per) => { return per.id === req.params.name});
	res.send(found);
	next();
}

function deletePerson(req, res, next) {
	for (let i=0; i<people.length; ++i ){
		if (people[i].id === req.params.name){
			people.splice(i,1);
		}

	}

	res.send(people);
	next();
}



server.post('/people', createPerson); //create single person
server.get('/people', getAllPeople); //get all people
server.get('/people/:name', getPerson); //get single person
server.del('/people/:name', deletePerson); // delete single person

server.listen(8080, function() {
  	people = [{"id" :"1", "Firstname": "John", "Lastname":"Doe", "Address": {"City":"City X", "State":"State X"}},
		  {"id" :"2", "Firstname": "Koko", "Lastname":"Doe", "Address": {"City":"City Y", "State":"State Y"}}];

	
	console.log('%s node.js Rest server listening at %s', server.name, server.url);
});
