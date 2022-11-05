require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const app = express();
const port = 3467;

const account = require('./routes/account');
const study = require('./routes/study');
const skill = require('./routes/skill');
const project = require('./routes/project');
const contact = require('./routes/contact');
// const language = require('./routes/language');
const web = require('./routes/web');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/auth', account);
app.use('/study', study);
app.use('/skill', skill);
app.use('/project', project);
app.use('/contact', contact);
// app.use('/language', language);
app.use('', web);

app.listen(port, () => console.log(`Server connected to port ${port}`));