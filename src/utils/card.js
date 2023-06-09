function getWeightForNullData(dataA, dataB) {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;
}

function sortIncrease(cardA, cardB) {
  const weight = getWeightForNullData(cardA.price, cardB.price);
  return weight ?? cardA.price - cardB.price;
}

function sortDescending(cardA, cardB) {
  const weight = getWeightForNullData(cardA.price, cardB.price);
  return weight ?? cardB.price - cardA.price;
}

function getPrice(price) {
  return price ? price.toLocaleString('ru') : 0;
}

export {sortIncrease, sortDescending, getPrice};
