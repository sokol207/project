export type Comment = {
  text: string;
  mark: number;
}

export type Offer = {
  photoOffer: string[];
  name: string;
  mark: number;
  cost: number;
  insides: string[];
  comments: Comment[];
};

export type Offers = Offer[];
