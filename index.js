/**
 * To-do for homework on 28 Jun 2018
 * =================================
 * 1. Create the relevant tables.sql file
 * 2. New routes for user-creation
 * 3. Change the pokemon form to add an input for user id such that the pokemon belongs to the user with that id
 * 4. (FURTHER) Add a drop-down menu of all users on the pokemon form
 * 5. (FURTHER) Add a types table and a pokemon-types table in your database, and create a seed.sql file inserting relevant data for these 2 tables. Note that a pokemon can have many types, and a type can have many pokemons.
 */

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser')
const sha256 = require('js-sha256');

// Initialise postgres client
const config = {
  user: 'wenvo',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

if (config.user === 'ck') {
    throw new Error("====== UPDATE YOUR DATABASE CONFIGURATION =======");
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Route Handler Functions
 * ===================================
 */

 const getRoot = (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //
  const queryString = 'SELECT * from pokemon;';

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/home', {pokemon: result.rows} );
    }
  });
}

const getNew = (request, response) => {

  response.render('pokemon/New');

}

const getPokemon = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      // console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/pokemon', {pokemon: result.rows[0]} );
    }
  });
}

const postPokemon = (request, response) => {
  let params = request.body;

  const queryString = 'INSERT INTO pokemon(name, img, weight, height) VALUES($1, $2, $3, $4);';
  const values = [params.name, params.img, params.weight, params.height];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      // console.log('query result:', result);

      // redirect to home page
      response.send('Pokemon added');
    }
  });
};

const editPokemonForm = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      // console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/edit', {pokemon: result.rows[0]} );
    }
  });
}

const updatePokemon = (request, response) => {
  let id = request.params['id'];
  let pokemon = request.body;
  const queryString = 'UPDATE "pokemon" SET "name"=($1), "img"=($2), "height"=($3), "weight"=($4) WHERE "id"=($5)';
  const values = [pokemon.name, pokemon.img, pokemon.height, pokemon.weight, id];
  console.log(queryString);
  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      // console.log('Query result:', result);

      // redirect to home page
      response.send('Pokemon updated');
    }
  });
}

const deletePokemonForm = (request, response) => {

    let id = request.params['id'];

    const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';

    pool.query(queryString,(err, result) => {

        if(err){
            console.error('Query error:', err.stack);

        } else {

            response.render('pokemon/delete', {pokemon: result.rows[0]});
        }
}
)};

const deletePokemon = (request, response) => {
    let id = request.params['id'];

    const queryString = 'DELETE FROM pokemon WHERE id = ' + id + ';';

    pool.query(queryString, (err,result) => {

        if(err){
            console.log('Query error:', err.stack);
        } else {
            response.send("Pokemon deleted");
        }
}
)};
/**
 * ===================================
 * User
 * ===================================
 */

 const userNew = (request, response) => {
  response.render('users/new');
}

 const getUser = (request, response) => {

  let id = request.params['id'];

  // const queryString = 'SELECT * FROM users WHERE id = ' + id + ';';

  const queryString = 'SELECT pokemon.id, pokemon.name FROM pokemon INNER JOIN relationship ON (relationship.pokemon_id = pokemon.id) WHERE relationship.user_id = ' + id + ';';

  pool.query(queryString, (err, result) => {

    if (err) {

      console.error('Query error:', err.stack);

    } else {

      console.log('Query result rows:', result.rows);

      }

      // redirect to home page
      response.render( 'users/show', {relationship: result.rows} );
    }
  )};

const userCreate = (request, response) => {

  const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';

  let hashedValue = sha256(request.body.password);

  const values = [request.body.name, hashedValue];

  console.log(queryString);

  pool.query(queryString, values, (err, result) => {

    if (err) {

      console.error('Query error:', err.stack);

      response.send('dang it.');

    } else {

      // console.log('Query result:', result);

      // redirect to home page
      response.send("Added new user");
    }
  });
}

 const userLogin = (request, response) => {
  response.render('users/login');
}

const userLoggedIn = (request, response) => {

    let id = request.body.id;

  const queryString = 'SELECT password FROM users WHERE id = ' + id;

  let hashedValue = sha256(request.body.password);

  // console.log(queryString);

  pool.query(queryString, (err, result) => {

    if (err) {

      console.error('Query error:', err.stack);
      response.send('Wrong password');
    } else {

        const user = result.rows[0];

        if( user.password === hashedValue ){
            // tell the browser to set a cookie
            response.cookie('loggedin', 'true');

            response.cookie('cookieId', id);

            response.send('You are logged in');

        } else{

            response.send('Try again');

                }
    }
  });
}

const userLogout = (request, response) => {
    response.clearCookie('loggedin');
    response.clearCookie('cookieId');
    response.send('You are logged out');
}

const caughtPokemon = (request, response) => {

  response.render('users/relationship');
}

const postRelationship = (request, response) => {

    if (request.cookies['loggedin'] === 'true') {
        let id = request.cookies['cookieId']
        const queryString = 'INSERT INTO relationship (user_id, pokemon_id) VALUES ($1, $2)';
        const values = [id, request.body.pokemon_id];

        pool.query(queryString, values, (err, result) => {

            if(err) {
      console.error('Query error:', err.stack);
      response.send('dang it.');
  } else {
      response.send('Pokemon caught');
  }
});
    } else {
      // redirect to home page
      response.send("Try logging in");
    }
  }

const cookieTest = (request, response) => {

    if (request.cookies['loggedin'] === 'true'){

        response.send('You are logged in');

    } else {
        response.send('You are logged out');

    }
};

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', getRoot);

app.get('/pokemon/:id/edit', editPokemonForm);
app.get('/pokemon/new', getNew);
app.get('/pokemon/:id', getPokemon);
app.get('/pokemon/:id/delete', deletePokemonForm);

app.post('/pokemon', postPokemon);

app.put('/pokemon/:id', updatePokemon);

app.delete('/pokemon/:id', deletePokemon);

// TODO: New routes for creating users
app.get('/users/new', userNew);
app.get('/users/login', userLogin);
app.get('/users/relationship', caughtPokemon);
app.post('/login', userLoggedIn);
app.get('/logout', userLogout);
app.get('/users/:id', getUser);
app.post('/users', userCreate);
app.get('/cookietest', cookieTest);

// Pokemon caught

app.post('/caught', postRelationship);

// User password

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Ahoy we go from the port of 3000!!!'));



// Handles CTRL-C shutdown
function shutDown() {
  console.log('Recalling all ships to harbour...');
  server.close(() => {
    console.log('... all ships returned...');
    pool.end(() => {
      console.log('... all loot turned in!');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

