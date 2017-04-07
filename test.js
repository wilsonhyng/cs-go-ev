var csgomarket = require('./index.js');

// csgomarket.getSinglePrice('AK-47', 'Vulcan', 'Factory New', null, function (err, data) {

//   if (err) {
//     console.error('ERROR', err);
//   } else {
//     console.log(data);
//   }

// });

// If you want to disable strictNameMode.
csgomarket.strictNameMode = false;

// Notice the missing '-' in AK 47. With strictNameMode off it will internally swap to 'AK-47'.
csgomarket.getSinglePrice('AK 47', 'Vulcan', 'Field Tested', true, function (err, data) {

  if (err) {
    console.error('ERROR', err);
  } else {
    console.log(data);
  }

});



