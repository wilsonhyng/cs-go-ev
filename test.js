var csgomarket = require('./index.js');
var request = require('request');
var getClosest = require('get-closest');
var Levenshtein = require('levenshtein');
var Q = require('q');
var hashName = require('./hashname.js');
var allNames = require('./matchingnames');

// csgomarket.getSinglePrice('AK-47', 'Vulcan', 'Factory New', null, function (err, data) {

//   if (err) {
//     console.error('ERROR', err);
//   } else {
//     console.log(data);
//   }

// });

// If you want to disable strictNameMode.
// csgomarket.strictNameMode = false;

// Notice the missing '-' in AK 47. With strictNameMode off it will internally swap to 'AK-47'.
// csgomarket.getSinglePrice('AK 47', 'Vulcan', 'Field Tested', true, function (err, data) {

//   if (err) {
//     console.error('ERROR', err);
//   } else {
//     console.log(data);
//   }

// });



var wears = ['Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred'];
var gunPrices = [];
var wearChance = [0.02, 0.31, 0.52, 0.09, 0.06];

// for (var i = 0; i < wear.length; i++) {
//   // console.log(i);
//   csgomarket.getSinglePrice('AK 47', 'Vulcan', wear[i], false, function (err, data) {
//     if (err) {
//       console.error('ERROR', err);
//     } else {
//       // i++;
//       // console.log('Weapon', data.wep + ' ' + data.skin + ' ' + data.wear);
//       // var gunPrice = 0;
//       // gunPrice += wearChance[j] * parseFloat((data.median_price).slice(1));
//       // console.log(wearChance[j])
//       // gunPrice += (parseFloat((data.median_price).slice(1)));     
//       var eachPrice = parseFloat((data.median_price).slice(1));
//       gunPrices.push(eachPrice);
//       // gunPrice += eachPrice * wearChance[j];
//     }
//   });
// }


var data = {
  prices : [{
    weapon : "AWP",
    cached : false,
    skins : ['Asiimov', 'BOOM'],
    skinData : {}
  }]
}

var getPrice = function(theData) {
  var promises = [];
  theData.skins.forEach(function(skin) {
    theData.skinData[skin] = {};
    wears.forEach(function(wear) {
      promises.push(csgomarket.getSinglePriceAsync(theData.weapon, skin, wear, false).then(function(data) {
        theData.skinData[skin][wear] = data;
      }));
    });
  });
  return Q.allSettled(promises).then(function() {
    return theData;
  });
}

getPrice(data.prices[0]).then(function(results) {
  // Do something with returned results here.

  var weapons =  Object.keys(results.skinData);
  var gunPrice = 0;

  for (var i = 0; i < Object.keys(results.skinData).length; i++) {    
    gunPrice += parseFloat((results.skinData[weapons[i]]['Field-Tested']['median_price']).slice(1));
  }
  console.log(gunPrice);
})


//   for (var i = 0; i < Object.keys(results.skinData).length; i++) {
//     console.log(weapons[i], results.skinData[weapons[i]]['Field-Tested']['median_price']);
//     // for (var j = 0; j < wears.length; j++) {
//     //   gunPrice += wearChance[j] * parseFloat((results.skinData[weapons[i][wears[j]['median_price']]]).slice(1));
//     //   console.log(gunPrice);

//     // }
//   }
//   // console.log(gunPrice);
// })