const showRoutes = require('./shows');
const aboutMeRoutes = require('./aboutMe');

const constructorMethod = (app) => {
  app.use('/shows', showRoutes);
  app.use('/aboutMe', aboutMeRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;