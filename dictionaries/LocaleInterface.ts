interface Home {
  title: string;
  subtitle: string;
  search: string;
  from: {
    title: string;
    value: string;
  };
  to: {
    title: string;
    value: string;
  };
  setDate: string;
  oneway: string;
  roundtrip: string;
  economy: string;
  business: string;
  passengers: string;
  adults: string;
  adultsAge: string;
  children: string;
  childrenAge: string;
  babies: string;
  babiesAge: string;
  done: string;
  whatoffers: string;
  offers: Offer[];
  bookflights: string;
  bookflightscards: string[];
}

interface Offer {
  title: string;
  description: string;
  icon: string;
}

export interface LocaleInterface {
  home: Home;
  nav: {
    home: string;
    about: string;
    flights: string;
  };
}
