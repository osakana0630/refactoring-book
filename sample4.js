//関数のインライン化

// function rating(aDriver) {
//   return moreThanFiveLateDeliveries(aDriver) ? 2 : 1
// }
//
// function moreThanFiveLateDeliveries(aDriver) {
//   return aDriver.moreThanFiveLateDeliveries > 5;
// }

// function rating(aDriver) {
//   return (aDriver.moreThanFiveLateDeliveries > 5) ? 2 : 1
// }


function rating(aDriver) {
  return moreThanFiveLateDeliveries(aDriver) ? 2 : 1
}

function moreThanFiveLateDeliveries(drv) {
  return drv.moreThanFiveLateDeliveries > 5;
}
