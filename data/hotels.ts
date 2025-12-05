import { Hotel } from "./types";

export const hotels: Hotel[] = [
  {
    id: "h1",
    name: "The Royal Orchid",
    type: "Hotel",
    address: {
      street: "MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India",
    },
    priceInPaisa: 450000,
    rating: 4.5,
    amenities: ["WiFi", "AC", "Breakfast"],
    description: "Luxury hotel near the metro station.",
    image: "https://placehold.co/600x400/orange/white?text=Royal+Orchid",
    policies: {
      coupleFriendly: false,
      checkInTime: "12:00",
      checkOutTime: "11:00",
    },
  },
  {
    id: "h2",
    name: "Goa Beach Shack",
    type: "Resort",
    address: {
      street: "Calangute Beach",
      city: "Goa",
      state: "Goa",
      pincode: "403516",
      country: "India",
    },
    priceInPaisa: 250000,
    rating: 4.2,
    amenities: ["Pool", "Bar", "Beach View"],
    description: "Relax right on the beach.",
    image: "https://placehold.co/600x400/blue/white?text=Goa+Shack",
    policies: {
      coupleFriendly: true,
      checkInTime: "14:00",
      checkOutTime: "11:00",
    },
  },
];