const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

const sprintf = require('sprintf-js').sprintf;

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////
exports.create = (text, callback) => {

  let id = counter.getNextUniqueId((err, id) => {
    if (err) {
      console.log('Error generating ID: ', err);
    } else {
      const toDoDir = `${exports.dataDir}/${id}.txt`;
      fs.writeFile(toDoDir, text, (err) => {
        if (err) {
          console.log('Error Writing File: ', err);
        } else {
          items[id] = text;
          callback(null, { id, text });
        }
      });
    }
  });

};

exports.readAll = (callback) => {

  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      console.log('You got an error');
    } else {
      var data = _.map(files, (text, id) => {
        return { id: text.slice(0, 5), text: text.slice(0, 5) };
      });
      callback(null, data);
    }
  });

};

exports.readOne = (id, callback) => {
  const toDoDir = `${exports.dataDir}/${id}.txt`;
  fs.readFile(toDoDir, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { id, text: data.toString()});
    }
  });
};

exports.update = (id, text, callback) => {
  const toDoDir = `${exports.dataDir}/${id}.txt`;
  fs.readFile(toDoDir, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      fs.writeFile(toDoDir, text, (err) => {
        if (err) {
          console.log('Error Writing File: ', err);
        } else {
          items[id] = text;
          callback(null, { id, text });
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  console.log(id);

  fs.unlink()


// var item = items[id];
//   delete items[id];
//   if (!item) {
//     // report an error if item not found
//     callback(new Error(`No item with id: ${id}`));
//   } else {
//     callback();
//   }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
