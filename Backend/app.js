const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "1234"));
const session = driver.session();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.post("/login", function (req, res) {
  var user = req.body.user;
  var password = req.body.password;

  var query = "MATCH (n:Persona) WHERE n.usuario='" + user + "' AND n.password='" + password + "' return n";


  const resultPromise = session.run(query);
  resultPromise.then(result => {
    session.close();

    if (result.records.length == 0) {
      res.send({ message: false })
    }
    else {
      var record = result.records[0].get(0).properties.usuario;
      res.send(record);

    }


  })
})

app.post("/usuarios", function (req, res) {
  var user = req.body.usuario;
  var nombre = req.body.nombre;
  var password = req.body.password;
  var nacimiento = req.body.nacimiento;
  var query = "CREATE (n:Persona{nombre:'" + nombre + "', nacimiento:" + nacimiento + ", usuario:'" + user + "', password:'" + password + "'})";


  const resultPromise = session.run(query);
  resultPromise.then(result => {
    session.close();
    res.send({ message: true })

  })
})

app.post("/actividadAzar", function (req, res) {

  var query = "MATCH (a:Actividad) return a";
  var array = [];
  var session = driver.session();
  var actividad;

  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {

        array.push(record.get(0).properties);
      },
      onCompleted: function () {

        var pos = Math.floor(Math.random() * array.length);

        actividad = array[pos];

        session
          .run(query)
          .subscribe({
            onNext: function (record2) {

              array = [];
              array.push(record2.get(0).properties);
            },
            onCompleted: function () {

              session.close();
              res.send(actividad);

            },
            onError: function (error) {
              console.log(error);
            }
          });

      },
      onError: function (error) {
        console.log(error);
      }
    });
});



app.post("/puntuar", function (req, res) {
  var user = req.body.user;
  var actividad = req.body.actividad;
  var puntuacion = req.body.puntuacion;

  var query = " MATCH (p:Persona)-[v:VALORA]->(a:Actividad) WHERE p.usuario = '" + user + "' AND e.nombre='" + actividad + "' AND exists(v.valoración) RETURN v.valoración"

  var array = [];
  var session = driver.session();
  var actividad;
  var tiene = false;

  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {

        if (record.length != 0) {
          tiene = true;
        }

      },
      onCompleted: function () {
        if (tiene) {

          query = "MATCH(p:Persona)-[v:VALORA]->(a:Actividad) WHERE p.usuario='" + user + "' AND e.nombre='" + actividad + "' SET v.valoración=" + puntuacion;

        }
        else {
          query = "START n=node(*), m=node(*) where n.usuario = '" + user + "' and m.nombre = '" + actividad + "' create (n)-[:VALORA{valoración:" + puntuacion + "}]->(m)";
        }
        const resultPromise = session.run(query);
        resultPromise.then(result => {
          session.close();
          res.send({ message: true })

        })


      },
      onError: function (error) {
        console.log(error);
      }
    });
});


app.post("/mio", function (req, res) {
  var user = req.body.user;
  var session = driver.session();
  var query = "MATCH (n:Persona{usuario:'" + user + "'})-[v:VALORA]->(a:Actividad) return a,v.valoración";


  var array = [];
  var objeto;


  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {

        objeto = (record.get(0).properties);
        objeto.puntuacion = record.get(1).low;
       
        array.push(objeto);

      },
      onCompleted: function () {
        session.close();
        res.send(array);

      },
      onError: function (error) {
        console.log(error);
      }
    });

});


app.post("/buscaActividad", function (req, res) {
  var user = req.body.user;
  var entorno = req.body.entorno;
  var modalidad = req.body.modalidad;
  var precio = req.body.precio;
  var localizacion = req.body.localizacion;
  var actividadFisica = req.body.actividadFisica;
  var session = driver.session();

 /* match (Yoav:Person{name:"Yoav"})-[:liked]->(movie:Movie),
  (Yoav)-[:watched]->(movie),
  (Yoav)-[:other]->(movie)
  return movie*/

  var query =  "MATCH(a:Actividad)-[:ES]->(e:Entorno) WHERE e.nombre='" + entorno + "',"
  + "(a)-[:ES]->(m:Modalidad) WHERE m.nombre='" + modalidad + "',"
  + "(a)-[:ES]->(p:Precio) WHERE p.nombre='" + precio + "',"
  + "(a)-[:ES]->(l:Localizacion) WHERE l.nombre='" + localizacion + "',"
  + "(a)-[:ES]->(af:ActividadFisica) WHERE af.nombre='" + actividadFisica + "' return a";
  var array = [];
  var objeto;


  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {

        objeto = (record.get(0).properties);
        objeto.actividad = record.get(1).properties.descripcion;
     
        array.push(objeto);
      },
      onCompleted: function () {

        session.close();
        res.send(array);

      },
      onError: function (error) {
        console.log(error);
      }
    });

});


app.listen(port, function () {
  console.log("Example app listening on port " + 3000);
});



