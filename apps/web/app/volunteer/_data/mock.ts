// ─── Types ───────────────────────────────────────────────────────────
export type Pickup = {
  id: string;
  title: string;
  image: string;
  location: string;
  dropLocation: string;
  distance: string;
  meals: number;
  expiry: string;
  urgency: "Urgent" | "Nearby" | "Normal";
  donor: string;
  donorPhone: string;
  status: "available" | "accepted" | "picked" | "delivered";
  description: string;
  completedAt?: string;
  rating?: number;
};

export type Notification = {
  id: string;
  type: "new_pickup" | "assigned" | "reminder" | "completed";
  title: string;
  subtitle: string;
  time: string;
  icon: string;
};

export type VolunteerProfile = {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  verified: boolean;
  totalDeliveries: number;
  rating: number;
  active: boolean;
  vehicle: string;
  availability: string;
  preferences: string;
};

// ─── Mock Pickups ────────────────────────────────────────────────────
export const availablePickups: Pickup[] = [
  {
    id: "1",
    title: "Assorted Meals",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop",
    location: "Green Valley Restaurant, MG Road",
    dropLocation: "Hope Foundation, Sector 21",
    distance: "2.4 km",
    meals: 25,
    expiry: "Expires in 30m",
    urgency: "Urgent",
    donor: "Green Valley Restaurant",
    donorPhone: "+91 98765 43210",
    status: "available",
    description: "Fresh vegetarian meals including rice, dal, sabzi, and roti. Packed in sealed containers.",
  },
  {
    id: "2",
    title: "Bakery Items",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop",
    location: "Sweet Crust Bakery, Koramangala",
    dropLocation: "Annapurna Shelter, BTM Layout",
    distance: "1.8 km",
    meals: 40,
    expiry: "Expires in 2h",
    urgency: "Nearby",
    donor: "Sweet Crust Bakery",
    donorPhone: "+91 98765 11111",
    status: "available",
    description: "Bread loaves, muffins, and pastries. Baked this morning.",
  },
  {
    id: "3",
    title: "Packed Lunch Boxes",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop",
    location: "Corporate Park Cafeteria, Whitefield",
    dropLocation: "Care Home, Marathahalli",
    distance: "5.1 km",
    meals: 60,
    expiry: "Expires in 1h",
    urgency: "Normal",
    donor: "TechPark Cafeteria",
    donorPhone: "+91 98765 22222",
    status: "available",
    description: "Individually packed lunch boxes with biryani and raita.",
  },
  {
    id: "4",
    title: "Fresh Fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=250&fit=crop",
    location: "FreshMart Supermarket, Indiranagar",
    dropLocation: "Sunshine Orphanage, HSR Layout",
    distance: "3.2 km",
    meals: 30,
    expiry: "Expires in 4h",
    urgency: "Nearby",
    donor: "FreshMart Store",
    donorPhone: "+91 98765 33333",
    status: "available",
    description: "Assorted seasonal fruits — bananas, apples, oranges, and grapes.",
  },
];

export const assignedPickups: Pickup[] = [
  {
    id: "5",
    title: "Dinner Buffet Leftovers",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop",
    location: "Grand Hotel, Brigade Road",
    dropLocation: "City Shelter, Richmond Town",
    distance: "3.5 km",
    meals: 50,
    expiry: "Expires in 1h",
    urgency: "Urgent",
    donor: "Grand Hotel",
    donorPhone: "+91 98765 44444",
    status: "accepted",
    description: "Mixed non-veg and veg buffet items in large containers.",
  },
  {
    id: "6",
    title: "Sandwich Platters",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=250&fit=crop",
    location: "SubWay Express, Jayanagar",
    dropLocation: "Night Shelter, Majestic",
    distance: "4.0 km",
    meals: 30,
    expiry: "Expires in 45m",
    urgency: "Urgent",
    donor: "SubWay Express",
    donorPhone: "+91 98765 55555",
    status: "picked",
    description: "Assorted sandwich platters from a corporate event.",
  },
];

export const completedPickups: Pickup[] = [
  {
    id: "7",
    title: "Rice & Curry",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=250&fit=crop",
    location: "Spice Garden, Malleshwaram",
    dropLocation: "Old Age Home, Rajajinagar",
    distance: "2.0 km",
    meals: 35,
    expiry: "",
    urgency: "Normal",
    donor: "Spice Garden",
    donorPhone: "+91 98765 66666",
    status: "delivered",
    description: "Home-style rice and curry combo.",
    completedAt: "Today, 12:30 PM",
    rating: 5,
  },
  {
    id: "8",
    title: "Chapati & Sabzi",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=250&fit=crop",
    location: "Roti House, Basavanagudi",
    dropLocation: "Community Kitchen, VV Puram",
    distance: "1.5 km",
    meals: 45,
    expiry: "",
    urgency: "Normal",
    donor: "Roti House",
    donorPhone: "+91 98765 77777",
    status: "delivered",
    description: "Freshly made chapatis with mixed vegetable sabzi.",
    completedAt: "Yesterday, 6:45 PM",
    rating: 4,
  },
  {
    id: "9",
    title: "Idli & Sambar",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=250&fit=crop",
    location: "South Tiffins, JP Nagar",
    dropLocation: "Govt School, Bannerghatta Rd",
    distance: "3.8 km",
    meals: 80,
    expiry: "",
    urgency: "Normal",
    donor: "South Tiffins",
    donorPhone: "+91 98765 88888",
    status: "delivered",
    description: "Idli, vada, and sambar in bulk packaging.",
    completedAt: "Mar 20, 11:00 AM",
    rating: 5,
  },
];

// ─── Notifications ───────────────────────────────────────────────────
export const notifications: { today: Notification[]; yesterday: Notification[] } = {
  today: [
    {
      id: "n1",
      type: "new_pickup",
      title: "New Pickup Available",
      subtitle: "Assorted Meals from Green Valley Restaurant",
      time: "10 min ago",
      icon: "📦",
    },
    {
      id: "n2",
      type: "assigned",
      title: "Pickup Assigned",
      subtitle: "Dinner Buffet Leftovers — Grand Hotel",
      time: "1h ago",
      icon: "✅",
    },
    {
      id: "n3",
      type: "reminder",
      title: "Pickup Reminder",
      subtitle: "Don't forget your 4:00 PM pickup at SubWay Express",
      time: "2h ago",
      icon: "⏰",
    },
  ],
  yesterday: [
    {
      id: "n4",
      type: "completed",
      title: "Delivery Completed",
      subtitle: "Rice & Curry delivered to Old Age Home",
      time: "Yesterday, 12:35 PM",
      icon: "🎉",
    },
    {
      id: "n5",
      type: "new_pickup",
      title: "New Pickup Available",
      subtitle: "Bakery Items from Sweet Crust Bakery",
      time: "Yesterday, 9:00 AM",
      icon: "📦",
    },
    {
      id: "n6",
      type: "reminder",
      title: "Weekly Summary",
      subtitle: "You completed 5 deliveries this week. Great job!",
      time: "Yesterday, 8:00 AM",
      icon: "📊",
    },
  ],
};

// ─── Profile ─────────────────────────────────────────────────────────
export const volunteerProfile: VolunteerProfile = {
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  verified: true,
  totalDeliveries: 127,
  rating: 4.8,
  active: true,
  vehicle: "Two-Wheeler (Activa 125)",
  availability: "Weekdays, 10 AM – 6 PM",
  preferences: "Vegetarian food only, max 5 km radius",
};
