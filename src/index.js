// archivo index.js
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
// Initializations
const app = express();
const session = require('express-session');
const router = express.Router();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main', // navegación que se va a repetir en todas las vistas -plantilla-.
        layoutsDir: path.join(app.get('views', 'layouts')), // le damos la dirección del dir layout a traves join  
        partialsDir: path.join(app.get('views', 'partials')), // retazos de código reutilizable, la cual también hay que direccionar
        extname: '.hbs' // dice que tipo de extensión van a tener los archivos de vistas-en este caso .hbs-
    }));

    // configurar el motor de vistas, pasándole el parámtro del nombre de motor '.hbs'
app.set('view engine', '.hbs');

// Middlewares
// recibe los datos de login de los usuarios al registrarse
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));  
// Global Variables

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static files

// Server in listenning
app.listen(app.get('port'), () => {
    console.log("Servidor en escucha e el puerto ", app.get('port'));
});