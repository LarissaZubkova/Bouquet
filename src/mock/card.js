import {getRandomArrayElement} from './utils.js';

const mockCards = [
    {
     id: 1,
     title: "Летнее настроение",
     description: "Cочетание полевых и садовых цветов: розы, львиный зев, чертополох, тюльпаны и эустома",
     type: "birthday",
     color: "red",
     price: 5800,
     previewImage: "http://localhost:9000/static/bouquets/preview/christie-kim.png",
     authorPhoto: "Christie Kim"
    },
    {
     id: 2,
     title: "Зимнее настроение",
     description: "розы, львиный зев, чертополох, тюльпаны и эустома",
     type: "birthday",
     color: "blue",
     price: 3800,
     previewImage: "http://localhost:9000/static/bouquets/preview/christie-kim.png",
     authorPhoto: "Christie Kim"
    },
    {
     id: 3,
     title: "Hастроение",
     description: "розы, львиный зев, чертополох, тюльпаны и эустома",
     type: "birthday",
     color: "blue",
     price: 4800,
     previewImage: "http://localhost:9000/static/bouquets/preview/christie-kim.png",
     authorPhoto: "Christie Kim"
    },
]

function getRandomCard() {
    return getRandomArrayElement(mockCards);
}

export {getRandomCard}
