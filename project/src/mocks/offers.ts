import {Offers} from '../types/Offer';

export const offers : Offers = [
  {
    photoOffer:[
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-01.jpg',
      'img/apartment-03.jpg',
      'img/apartment-03.jpg'
    ],
    name : 'Beautiful & luxurious studio at great location',
    mark: 4,
    insides: ['Wi-Fi','Kitchen','Washing machine','Towels','Cabel TV'],
    host: {
      name:'Angelina',
      image:'img/avatar-angelina.jpg',
      text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.\n\nAn independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
      userStatus:'pro'
    },
    cost: 123,
    comments: [
      {
        text:'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The\nbuilding is green and from 18th century.',
        mark: '80%',
        name: 'Max',
        image: 'img/avatar-max.jpg',
        dateTime: 'April 2019'
      },
      {
        text:'bad',
        mark: '20%',
        name: 'Max',
        image: 'img/avatar-max.jpg',
        dateTime: 'April 2019'
      }
    ]
  }
];
