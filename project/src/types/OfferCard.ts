export type OfferCard = {
  photoOffer: string;
  name: string;
  mark: string;
  cost: number;
  type: string;
  bookmark: boolean;
  placeCard: string;
  point:{
         lat:number;
         lng:number;
        }
};

export type OfferList = {
  regionName: string;
  offers: OfferCard[];
};

export type OfferListForPage = OfferList[];
