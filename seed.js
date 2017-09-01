const db = require('./server/db/db');
const Student = require('./server/db/models/student');
const Campus = require('./server/db/models/campus');
const Promise = require('bluebird');

const campuses = [
  { name: 'Terra', image: '/images/Terra.jpeg' },
  { name: 'Mars', image: '/images/Mars.jpeg' },
  { name: 'Luna', image: '/images/Luna.jpeg' },
  { name: 'Titan', image: '/images/Titan.jpeg' },
  { name: 'Venus', image: '/images/Venus.jpeg' },
  { name: 'Ekon', image: 'http://images.all-free-download.com/images/graphiclarge/beautiful_city_architectural_photography_6_165964.jpg' },
  { name: 'Cowboy Hall', image: 'https://us.123rf.com/450wm/macrovector/macrovector1512/macrovector151200648/49542835-cowboy-concept-with-man-on-horse-and-saloon-building-on-background-vector-illustration.jpg?ver=6' },
  { name: 'Mt. Classy', image: 'http://wallup.net/wp-content/uploads/2016/01/178549-Machu_Picchu-landscape-mountain-Chile-old_building-forest-748x421.jpg' },
  { name: 'Detroit', image: 'http://detroiturbex.com/content/downtown/freep/img/3.jpg' },
  { name: 'Roosevelt', image: 'https://www.signmeup.com/images/clients/64188h_RU_stack_logo_green.gif' },
  { name: 'Mercury', image: 'https://apod.nasa.gov/apod/image/1303/PIA16853mercury.jpg' },
];

const id = () => Math.round(Math.random() * (campuses.length - 1));
// const id = () => 0;

const students = [{
  name: 'Cody',
  email: 'cody@cody.com',
  campusName: campuses[id()].name
}, {
  name: 'Ben',
  email: 'ben@ben.com',
  campusName: campuses[id()].name,
}, {
  name: 'Star',
  email: 'star@star.com',
  campusName: campuses[id()].name,
}, {
  name: 'Batman',
  email: 'batman@batman.com',
  campusName: campuses[id()].name,
}, {
  name: 'Elliott',
  email: 'elliot@elliot.com',
  campusName: campuses[id()].name,
}, {
  name: 'Fira',
  email: 'fira@fira.com',
  campusName: campuses[id()].name,
}, {
  name: 'Henry',
  email: 'henry@henry.com',
  campusName: campuses[id()].name,
}, {
  name: 'Marcy',
  email: 'marcy@marcy.com',
  campusName: campuses[id()].name,
}, {
  name: 'Milton',
  email: 'milton@milton.com',
  campusName: campuses[id()].name,
}, {
  name: 'Murphy',
  email: 'murphy@murphy.com',
  campusName: campuses[id()].name,
}, {
  name: 'Raffi',
  email: 'raffi@raffi.com',
  campusName: campuses[id()].name,
}, {
  name: 'Tulsi',
  email: 'tulsi@tulsi.com',
  campusName: campuses[id()].name,
}, {
  name: 'Pork Chop',
  email: 'porkchop@porkchop.com',
  campusName: campuses[id()].name,
}, {
  name: 'Ribs',
  email: 'ribs@ribs.com',
  campusName: campuses[id()].name,
}, {
  name: 'Stacey',
  email: 'stacey@stacey.com',
  campusName: campuses[id()].name,
}, {
  name: 'JD',
  email: 'jd@jd.com',
  campusName: campuses[id()].name,
}, {
  name: 'Slim',
  email: 'slim@slim.com',
  campusName: campuses[id()].name,
}, {
  name: 'Yoda',
  email: 'yoda@yoda.com',
  campusName: campuses[id()].name,
}, {
  name: 'Mark',
  email: 'mark@mark.com',
  campusName: campuses[id()].name,
}, {
  name: 'Larry',
  email: 'larry@larry.com',
  campusName: campuses[id()].name,
}, {
  name: 'Lisa',
  email: 'lisa@lisa.com',
  campusName: campuses[id()].name,
}, {
  name: 'Odie',
  email: 'odie@odie.com',
  campusName: campuses[id()].name,
}];

const seed = () => (
  Promise.all(campuses.map(campus => {
    console.log(campus)
    return Campus.create(campus)
  }))
  .then(() =>
    Promise.all(students.map(student => {
      console.log(student)
      return Student.create(student)
    }))
  )
)

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
