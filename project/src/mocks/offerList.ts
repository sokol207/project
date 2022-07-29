import {CommentsType, OfferCard, OfferListForPage} from '../types/offer-card';
import {CityList} from '../const';

export const offerCard : OfferCard[] = [
  {
    bedrooms: 1,
    city: CityList[0],
    description:'Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.',
    title: 'Nice, cozy, warm big bed apartment',
    goods:[
      'Laptop friendly workspace',
      'Washer',
      'Breakfast',
      'Air conditioning'
    ],
    host: {
      id: 25,
      name: 'Angelina',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    id: 1,
    images: [
      'https://10.react.pages.academy/static/hotel/8.jpg',
      'https://10.react.pages.academy/static/hotel/6.jpg',
      'https://10.react.pages.academy/static/hotel/5.jpg',
      'https://10.react.pages.academy/static/hotel/14.jpg',
      'https://10.react.pages.academy/static/hotel/1.jpg',
      'https://10.react.pages.academy/static/hotel/4.jpg',
      'https://10.react.pages.academy/static/hotel/7.jpg',
      'https://10.react.pages.academy/static/hotel/12.jpg',
      'https://10.react.pages.academy/static/hotel/13.jpg',
      'https://10.react.pages.academy/static/hotel/10.jpg',
      'https://10.react.pages.academy/static/hotel/3.jpg',
      'https://10.react.pages.academy/static/hotel/20.jpg',
      'https://10.react.pages.academy/static/hotel/15.jpg',
      'https://10.react.pages.academy/static/hotel/19.jpg'
    ],
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 48.7,
      longitude: 2.2,
      zoom: 10,
    },
    maxAdults: 5,
    previewImage :'img/apartment-03.jpg',
    price: 180,
    type: 'Apartment',
    rating:4.5
  },{
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    previewImage: 'https://10.react.pages.academy/static/hotel/17.jpg',
    images: [
      'https://10.react.pages.academy/static/hotel/17.jpg',
      'https://10.react.pages.academy/static/hotel/11.jpg',
      'https://10.react.pages.academy/static/hotel/2.jpg'
    ],
    title: 'Wood and stone place',
    isFavorite: false,
    isPremium: true,
    rating: 4.9,
    type: 'house',
    bedrooms: 2,
    maxAdults: 7,
    price: 944,
    goods: [
      'Fridge',
      'Baby seat',
      'Air conditioning',
      'Dishwasher',
      'Breakfast',
      'Towels',
      'Washer',
      'Laptop friendly workspace'
    ],
    host: {
      id: 25,
      name: 'Angelina',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    description: 'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
    location: {
      latitude: 48.83861,
      longitude: 2.350499,
      zoom: 16
    },
    id: 8
  }
];

export const offerList : OfferListForPage = [
  {
    regionName: 'Paris',
    offers:   offerCard
  }
];

export const CommentList : CommentsType = [
  {
    id: 1,
    user: {
      id: 12,
      isPro: true,
      name: 'Isaac',
      avatarUrl: 'https://10.react.pages.academy/static/avatar/3.jpg'
    },
    rating: 4,
    comment: 'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
    date: '2022-06-13T12:25:36.938Z'
  }
];
