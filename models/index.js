const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

// module.exports = {
//   db,
// };

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    validate: {
      notNull: true,
    },
  },
  content: {
    type: Sequelize.TEXT,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notNull: true,
      is: ['^[a-z]+$', 'i'],
    },
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      notNull: true,
      isEmail: true,
    },
  },
});

module.exports = { db, Page, User };
