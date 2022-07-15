export type OfferCard = {
  photoOffer: string;
  name: string;
  mark: string;
  cost: number;
  type: string;
};

export type OfferList = {
  regionName: string;
  offers: OfferCard[];
};

export type OfferListForPage = OfferList[];
