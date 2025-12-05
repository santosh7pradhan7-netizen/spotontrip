export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Hotel {
  id: string;
  name: string;
  type: "Hotel" | "Resort" | "Homestay";
  address: Address;
  priceInPaisa: number;
  rating: number;
  amenities: string[];
  description: string;
  image: string;
  policies: {
    coupleFriendly: boolean;
    checkInTime: string;
    checkOutTime: string;
  };
}