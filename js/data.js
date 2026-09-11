const STORE_CONFIG = {
  name: "Mahabir Jewellers",
  tagline: "Heritage of Purity & Timeless Craftsmanship",
  address: "Main Market Road, Kishorenagar, District Angul, Odisha - 759126",
  phone: "+91 9938625057",
  whatsappNumber: "919938625057",
  email: "sahooanil320@gmail.com",
  timing: "Mon - Sun: 9:30 AM to 8:30 PM",
  rates: {
    gold24k: 15,125, // per gram in INR
    gold22k: 14,405, // per gram in INR
    gold18k: 11,786, // per gram in INR
    silver999: 245, // per gram in INR
    lastUpdated: "Today, 10:00 AM IST"
  }
};

const CATEGORIES = [
  { id: "all", name: "All Collections", icon: "fa-gem" },
  { id: "bridal", name: "Bridal Heritage", icon: "fa-crown" },
  { id: "necklaces", name: "Necklaces & Chokers", icon: "fa-ring" },
  { id: "bangles", name: "Bangles & Kadas", icon: "fa-circle-notch" },
  { id: "rings", name: "Rings & Solitaires", icon: "fa-gem" },
  { id: "earrings", name: "Jhumkas & Earrings", icon: "fa-spa" },
  { id: "silver", name: "Pure Silver & Pooja", icon: "fa-coins" },
  { id: "coins", name: "Gold Coins & Bullion", icon: "fa-medal" }
];

const PRODUCTS = [
  {
    id: "MJ-GLD-001",
    name: "Royal Rajwadi Kundan Bridal Choker Set",
    category: "bridal",
    metal: "Gold",
    purity: "22K BIS Hallmarked",
    karat: 22,
    weight: "48.5g",
    weightGrams: 48.5,
    basePrice: 326890,
    discountPrice: 319999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    description: "Exquisite handcrafted 22 Karat gold choker embedded with premium Kundan stones, emerald beads, and matching royal jhumkas. Certified BIS 916 with HUID.",
    makingCharge: "10%",
    inStock: true
  },
  {
    id: "MJ-GLD-002",
    name: "Antique Peacock Nakshi Temple Necklace",
    category: "necklaces",
    metal: "Gold",
    purity: "22K BIS Hallmarked",
    karat: 22,
    weight: "36.2g",
    weightGrams: 36.2,
    basePrice: 243988,
    discountPrice: 238500,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    badge: "Heritage",
    description: "Traditional South Indian and Odia antique temple artistry depicting dancing peacocks and Goddess motifs. Matte antique polish finish.",
    makingCharge: "11%",
    inStock: true
  },
  {
    id: "MJ-GLD-003",
    name: "Traditional Floral Filigree Gold Kadas (Pair)",
    category: "bangles",
    metal: "Gold",
    purity: "22K BIS Hallmarked",
    karat: 22,
    weight: "42.0g",
    weightGrams: 42.0,
    basePrice: 283080,
    discountPrice: 275000,
    image: "https://images.unsplash.com/photo-1611591475816-1f91b7d519b5?auto=format&fit=crop&w=800&q=80",
    badge: "Classic",
    description: "Intricately woven Cuttack-inspired filigree (Tarakasi style) gold bangles. Features a secure screw-lock mechanism for comfort and safety.",
    makingCharge: "9%",
    inStock: true
  },
  {
    id: "MJ-GLD-004",
    name: "Solitaire Diamond Engagement Ring in 18K Yellow Gold",
    category: "rings",
    metal: "Gold & Diamond",
    purity: "18K Gold + VVS/EF Diamond",
    karat: 18,
    weight: "4.8g",
    weightGrams: 4.8,
    basePrice: 89500,
    discountPrice: 84999,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    badge: "IGI Certified",
    description: "Brilliant round-cut 0.50 ct solitaire diamond set in an elegant 6-prong 18 Karat yellow gold band. Accompanied by IGI Certification.",
    makingCharge: "Free Making",
    inStock: true
  },
  {
    id: "MJ-GLD-005",
    name: "Heritage Odia Jhumka with Pearl Cascades",
    category: "earrings",
    metal: "Gold",
    purity: "22K BIS Hallmarked",
    karat: 22,
    weight: "18.4g",
    weightGrams: 18.4,
    basePrice: 124016,
    discountPrice: 120500,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    badge: "Trending",
    description: "Magnificent triple-tiered festive jhumkas embellished with authentic Basra-inspired seed pearls and delicate hanging bells.",
    makingCharge: "10%",
    inStock: true
  },
  {
    id: "MJ-GLD-006",
    name: "Grand Maharani Gold Bridal Haar (5-Row)",
    category: "bridal",
    metal: "Gold",
    purity: "22K BIS Hallmarked",
    karat: 22,
    weight: "72.0g",
    weightGrams: 72.0,
    basePrice: 485280,
    discountPrice: 472000,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
    badge: "Bridal Masterpiece",
    description: "Opulent wedding long necklace featuring five rows of polished gold balls, ruby centerpieces, and regal filigree medallion.",
    makingCharge: "11%",
    inStock: true
  },
  {
    id: "MJ-SLV-007",
    name: "Pure 925 Silver Laxmi-Ganesh Pooja Thali Set",
    category: "silver",
    metal: "Silver",
    purity: "92.5% Chandi",
    karat: 0,
    weight: "250.0g",
    weightGrams: 250.0,
    basePrice: 26500,
    discountPrice: 24900,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    badge: "Pure Silver",
    description: "Complete ceremonial pooja ensemble: embossed silver thali, Laxmi & Ganesha idols, diya, incense stand, bell, and kumkum katori.",
    makingCharge: "Flat ₹1500",
    inStock: true
  },
  {
    id: "MJ-GLD-008",
    name: "24K 999 Purity Laxmi Gold Coin (10 Grams)",
    category: "coins",
    metal: "Gold",
    purity: "24K 999.9 Fine Gold",
    karat: 24,
    weight: "10.0g",
    weightGrams: 10.0,
    basePrice: 74500,
    discountPrice: 73500,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80",
    badge: "Investment",
    description: "Tamper-proof certicard packed 10g 24 Karat gold coin with high-relief Goddess Laxmi impression on front and Mahabir Jewellers hallmark on reverse.",
    makingCharge: "0% Making",
    inStock: true
  },
  {
    id: "MJ-GLD-009",
    name: "Traditional Floral Gold Mangalsutra with Black Beads",
    category: "necklaces",
    metal: "Gold",
    purity: "22K BIS Hallmarked",
    karat: 22,
    weight: "15.6g",
    weightGrams: 15.6,
    basePrice: 105144,
    discountPrice: 101999,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    badge: "Auspicious",
    description: "Timeless 22K gold double-strand black bead mangalsutra with a hand-carved floral pendant. Specially designed for daily durability and bridal grace.",
    makingCharge: "8%",
    inStock: true
  },
  {
    id: "MJ-SLV-010",
    name: "Handcrafted 925 Sterling Silver Bridal Payal (Anklets)",
    category: "silver",
    metal: "Silver",
    purity: "925 Sterling Silver",
    karat: 0,
    weight: "95.0g",
    weightGrams: 95.0,
    basePrice: 10450,
    discountPrice: 9600,
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80",
    badge: "Handcrafted",
    description: "Traditional ghungroo chiming silver payal with antique oxidised finish, perfect for weddings, Odissi recitals, and special rituals.",
    makingCharge: "Flat ₹800",
    inStock: true
  },
  {
    id: "MJ-GLD-011",
    name: "Men's Solid 22K Gold Royal Cuban Chain",
    category: "necklaces",
    metal: "Gold",
    purity: "22K BIS Hallmarked",
    karat: 22,
    weight: "32.5g",
    weightGrams: 32.5,
    basePrice: 219050,
    discountPrice: 213900,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
    badge: "Men's Collection",
    description: "Substantial 22 Karat yellow gold curb-link Cuban chain with high-polish diamond-cut edges and heavy-duty lobster clasp.",
    makingCharge: "8%",
    inStock: true
  },
  {
    id: "MJ-GLD-012",
    name: "Modern Diamond Stud Earrings (0.30 ct TW)",
    category: "earrings",
    metal: "Gold & Diamond",
    purity: "18K Gold + VVS/GH Diamond",
    karat: 18,
    weight: "2.6g",
    weightGrams: 2.6,
    basePrice: 42000,
    discountPrice: 38999,
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=800&q=80",
    badge: "Daily Luxury",
    description: "Understated luxury for daily corporate or casual elegance. Four-prong setting with screw-backs for utmost security.",
    makingCharge: "Free Making",
    inStock: true
  }
];

const REVIEWS = [
  {
    name: "Sasmita Sahoo",
    location: "Kishorenagar, Angul",
    rating: 5,
    comment: "Bought my daughter's wedding bridal jewellery set from Mahabir Jewellers. Exceptional purity, 100% hallmarked, and very fair making charges! The staff is extremely cordial.",
    date: "February 2026"
  },
  {
    name: "Rajesh Kumar Pradhan",
    location: "Athmallik, Angul",
    rating: 5,
    comment: "The best and most trusted jewellery showroom in our region. I bought gold coins and a chain. They gave complete computerised hallmark billing and tested purity in front of me.",
    date: "January 2026"
  },
  {
    name: "Priyanka Mishra",
    location: "Talcher, Angul",
    rating: 5,
    comment: "Ordered directly through WhatsApp using their website. They delivered safely to our home with full insurance and billing. Highly recommend Mahabir Jewellers!",
    date: "March 2026"
  }
];
