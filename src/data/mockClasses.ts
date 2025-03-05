
import { ClassItem } from "@/types/class";

const mockClasses: Record<string, ClassItem[]> = {
  "Pottery": [
    {
      id: 1,
      title: "Introduction to Pottery",
      instructor: "Sarah Johnson",
      price: 75,
      rating: 4.8,
      images: [],
      level: "Beginner",
      date: [
        new Date("2024-02-15"),
        new Date("2024-02-22"),
        new Date("2024-02-29")
      ],
      city: "London",
      category: "Pottery"
    },
    {
      id: 2,
      title: "Wheel Throwing Workshop",
      instructor: "Michael Chen",
      price: 90,
      rating: 4.9,
      images: [],
      level: "Intermediate",
      date: [
        new Date("2024-02-20"), 
        new Date("2024-02-27"),
        new Date("2024-03-05")
      ],
      city: "Manchester",
      category: "Pottery"
    },
    {
      id: 9,
      title: "Advanced Pottery Techniques",
      instructor: "Emily Parker",
      price: 95,
      rating: 4.7,
      images: [],
      level: "Advanced",
      date: [new Date("2024-03-10"), new Date("2024-03-17")],
      city: "Brighton",
      category: "Pottery",
      groupBookingsEnabled: true,
      privateBookingsEnabled: true,
      basePriceGroup: 80,
      basePricePrivate: 120
    },
    {
      id: 10,
      title: "Sculptural Ceramics Workshop",
      instructor: "Daniel White",
      price: 85,
      rating: 4.6,
      images: [],
      level: "Intermediate",
      date: new Date("2024-03-15"),
      city: "Oxford",
      category: "Pottery",
      groupBookingsEnabled: true,
      privateBookingsEnabled: false,
      basePriceGroup: 70
    }
  ],
  "Cooking": [
    {
      id: 3,
      title: "Italian Pasta Making",
      instructor: "Marco Rossi",
      price: 65,
      rating: 4.7,
      images: [],
      level: "Beginner",
      date: new Date("2024-02-18"),
      city: "Birmingham",
      category: "Cooking"
    },
    {
      id: 4,
      title: "Asian Fusion Cuisine",
      instructor: "Lisa Wong",
      price: 85,
      rating: 4.6,
      images: [],
      level: "Intermediate",
      date: [
        new Date("2024-02-22"),
        new Date("2024-03-01"),
        new Date("2024-03-08")
      ],
      city: "Leeds",
      category: "Cooking"
    },
    {
      id: 11,
      title: "Mediterranean Cuisine Masterclass",
      instructor: "Sofia Martinez",
      price: 75,
      rating: 4.8,
      images: [],
      level: "Intermediate",
      date: [new Date("2024-03-20"), new Date("2024-03-27")],
      city: "Cambridge",
      category: "Cooking",
      groupBookingsEnabled: true,
      privateBookingsEnabled: true,
      basePriceGroup: 65,
      basePricePrivate: 100
    },
    {
      id: 12,
      title: "Sushi Making Experience",
      instructor: "Yuki Tanaka",
      price: 90,
      rating: 4.9,
      images: [],
      level: "Beginner",
      date: new Date("2024-03-25"),
      city: "Newcastle",
      category: "Cooking",
      groupBookingsEnabled: false,
      privateBookingsEnabled: true,
      basePricePrivate: 150
    }
  ],
  "Painting & Art": [
    {
      id: 5,
      title: "Watercolor Basics",
      instructor: "Emma Thompson",
      price: 60,
      rating: 4.5,
      images: [],
      level: "Beginner",
      date: new Date("2024-02-25"),
      city: "Bristol",
      category: "Painting & Art"
    },
    {
      id: 6,
      title: "Oil Painting Masterclass",
      instructor: "David Wilson",
      price: 95,
      rating: 4.9,
      images: [],
      level: "Advanced",
      date: [new Date("2024-02-28"), new Date("2024-03-07")],
      city: "Edinburgh",
      category: "Painting & Art"
    },
    {
      id: 13,
      title: "Abstract Art Workshop",
      instructor: "Alex Rivera",
      price: 70,
      rating: 4.7,
      images: [],
      level: "Intermediate",
      date: [new Date("2024-04-01"), new Date("2024-04-08")],
      city: "Cardiff",
      category: "Painting & Art",
      groupBookingsEnabled: true,
      privateBookingsEnabled: true,
      basePriceGroup: 60,
      basePricePrivate: 110
    },
    {
      id: 14,
      title: "Portrait Drawing Masterclass",
      instructor: "Isabella Chen",
      price: 80,
      rating: 4.8,
      images: [],
      level: "Advanced",
      date: new Date("2024-04-05"),
      city: "Sheffield",
      category: "Painting & Art",
      groupBookingsEnabled: true,
      privateBookingsEnabled: true,
      basePriceGroup: 70,
      basePricePrivate: 120
    }
  ],
  "Photography": [
    {
      id: 7,
      title: "DSLR Photography Basics",
      instructor: "James Miller",
      price: 70,
      rating: 4.6,
      images: [],
      level: "Beginner",
      date: new Date("2024-03-02"),
      city: "Glasgow",
      category: "Photography"
    },
    {
      id: 8,
      title: "Street Photography Workshop",
      instructor: "Sophie Clark",
      price: 80,
      rating: 4.7,
      images: [],
      level: "Intermediate",
      date: [new Date("2024-03-05"), new Date("2024-03-12")],
      city: "Liverpool",
      category: "Photography"
    },
    {
      id: 15,
      title: "Night Photography Workshop",
      instructor: "Lucas Black",
      price: 85,
      rating: 4.8,
      images: [],
      level: "Intermediate",
      date: [new Date("2024-04-10"), new Date("2024-04-17")],
      city: "Belfast",
      category: "Photography",
      groupBookingsEnabled: true,
      privateBookingsEnabled: true,
      basePriceGroup: 75,
      basePricePrivate: 130
    },
    {
      id: 16,
      title: "Portrait Photography Essentials",
      instructor: "Emma Wilson",
      price: 75,
      rating: 4.6,
      images: [],
      level: "Beginner",
      date: new Date("2024-04-15"),
      city: "Southampton",
      category: "Photography",
      groupBookingsEnabled: false,
      privateBookingsEnabled: true,
      basePricePrivate: 140
    }
  ],
  "Candle Making": [
    {
      id: 17,
      title: "Luxury Candle Making Workshop",
      instructor: "Oliver Smith",
      price: 65,
      rating: 4.7,
      images: [],
      level: "Beginner",
      date: [new Date("2024-04-20"), new Date("2024-04-27")],
      city: "Reading",
      category: "Candle Making",
      groupBookingsEnabled: true,
      privateBookingsEnabled: true,
      basePriceGroup: 55,
      basePricePrivate: 95
    },
    {
      id: 18,
      title: "Seasonal Scented Candles",
      instructor: "Sophie Brown",
      price: 70,
      rating: 4.8,
      images: [],
      level: "Intermediate",
      date: new Date("2024-04-25"),
      city: "Norwich",
      category: "Candle Making",
      groupBookingsEnabled: true,
      privateBookingsEnabled: false,
      basePriceGroup: 60
    }
  ],
  "Jewellery & Metal": [
    {
      id: 19,
      title: "Silver Ring Making Workshop",
      instructor: "Grace Taylor",
      price: 95,
      rating: 4.9,
      images: [],
      level: "Beginner",
      date: [new Date("2024-05-01"), new Date("2024-05-08")],
      city: "Leicester",
      category: "Jewellery & Metal",
      groupBookingsEnabled: true,
      privateBookingsEnabled: true,
      basePriceGroup: 85,
      basePricePrivate: 150
    },
    {
      id: 20,
      title: "Metal Stamping Jewelry",
      instructor: "William Harris",
      price: 80,
      rating: 4.7,
      images: [],
      level: "Intermediate",
      date: new Date("2024-05-05"),
      city: "Nottingham",
      category: "Jewellery & Metal",
      groupBookingsEnabled: false,
      privateBookingsEnabled: true,
      basePricePrivate: 130
    }
  ]
};

export { mockClasses };
