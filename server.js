const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
require('dotenv').config();

//backend server api code:
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// handlebars
const hbs = handlebars.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Sessions:
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'rxby795ryma173869420',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});