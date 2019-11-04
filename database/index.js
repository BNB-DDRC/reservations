const Sequelize = require('sequelize');
const MYSQL_USER_PASSWORD = require('../mySQL.config');

const sequelize = new Sequelize('reservations', 'root', MYSQL_USER_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Sequelize.Model.init(attributes, options) = sequelize.define(modelName, attributes, options)
const { Model } = Sequelize;
class Listing extends Model { }
Listing.init({
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  pricePerNight: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ratings: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  reviews: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  serviceFee: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  maxGuest: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  lowerBoundGuestNum: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'listing',
  // options
});

const Calendar = sequelize.define('calendar', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  october1: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october2: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october3: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october4: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october5: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october6: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october7: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october8: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october9: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october10: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october11: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october12: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october13: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october14: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october15: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october16: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october17: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october18: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october19: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october20: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october21: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october22: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october23: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october24: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october25: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october26: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october27: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october28: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october29: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october30: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  october31: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },

  november1: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november2: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november3: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november4: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november5: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november6: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november7: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november8: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november9: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november10: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november11: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november12: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november13: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november14: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november15: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november16: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november17: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november18: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november19: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november20: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november21: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november22: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november23: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november24: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november25: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november26: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november27: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november28: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november29: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  november30: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december1: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december2: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december3: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december4: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december5: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december6: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december7: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december8: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december9: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december10: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december11: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december12: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december13: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december14: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december15: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december16: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december17: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december18: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december19: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december20: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december21: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december22: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december23: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december24: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december25: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december26: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december27: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december28: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december29: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december30: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  december31: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
}, {
  // options
});

// Associations
Listing.hasOne(Calendar);

console.log('testing connection');

module.exports = {
  Listing,
  Calendar,
};
