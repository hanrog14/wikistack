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
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

Page.beforeValidate((userInstance) => {
  userInstance.slug = slug(userInstance.title)
})

function slug(title) {
  if (title === '') {
    let str = ''
    for (let x = 0; x < 5; x++) {
      str = str + Math.round(Math.random() * 10);
    }
    return str;
  } else {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
}

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
