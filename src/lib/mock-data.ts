// ==================== TYPES ====================
export type UserRole = "landlord" | "tenant" | "chef";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  dormId?: string;
  roomId?: string;
}

export interface Dorm {
  id: string;
  name: string;
  address: string;
  contact: string;
  totalRooms: number;
  occupiedRooms: number;
  mealCostMethod: "per_meal" | "proportional";
  billingCycle: "monthly" | "quarterly";
  perMealRate: number;
}

export interface Room {
  id: string;
  dormId: string;
  number: string;
  capacity: number;
  occupied: number;
  monthlyRent: number;
  status: "available" | "occupied" | "maintenance";
  tenants: string[];
}

export interface MealPlan {
  id: string;
  dormId: string;
  weekStart: string;
  days: MealDay[];
}

export interface MealDay {
  date: string;
  dayName: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface MealToggle {
  tenantId: string;
  date: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

export interface MealCount {
  date: string;
  breakfast: number;
  lunch: number;
  dinner: number;
}

export interface Invoice {
  id: string;
  tenantId: string;
  tenantName: string;
  month: string;
  rent: number;
  mealCost: number;
  adjustments: number;
  total: number;
  status: "paid" | "pending" | "overdue";
  paidDate?: string;
  dueDate: string;
}

export interface MaintenanceRequest {
  id: string;
  tenantId: string;
  tenantName: string;
  roomNumber: string;
  title: string;
  description: string;
  category: "plumbing" | "electrical" | "furniture" | "hvac" | "other";
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high";
  date: string;
  photo?: string;
}

export interface Announcement {
  id: string;
  dormId: string;
  title: string;
  content: string;
  type: "urgent" | "info" | "update";
  date: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  maxRooms: number;
  features: string[];
  mealFeatures: string;
  popular?: boolean;
}

// ==================== MOCK DATA ====================

export const USERS: User[] = [
  { id: "u1", name: "Sovannara Chhem", email: "sovannara@dormify.com", role: "landlord", phone: "+855 12 345 678" },
  { id: "u2", name: "Alex Rivera", email: "alex@student.edu", role: "tenant", dormId: "d1", roomId: "r1", phone: "+855 98 765 432" },
  { id: "u3", name: "Srey Pov", email: "sreypov@student.edu", role: "tenant", dormId: "d1", roomId: "r2", phone: "+855 77 111 222" },
  { id: "u4", name: "Dara Kim", email: "dara@student.edu", role: "tenant", dormId: "d1", roomId: "r3", phone: "+855 88 333 444" },
  { id: "u5", name: "Chef Makara", email: "makara@dormify.com", role: "chef", dormId: "d1", phone: "+855 12 999 888" },
  { id: "u6", name: "Sreyleak Meas", email: "sreyleak@student.edu", role: "tenant", dormId: "d1", roomId: "r4", phone: "+855 77 555 666" },
  { id: "u7", name: "Visal Sok", email: "visal@student.edu", role: "tenant", dormId: "d2", roomId: "r5", phone: "+855 88 777 888" },
  { id: "u8", name: "Bopha Chan", email: "bopha@student.edu", role: "tenant", dormId: "d1", roomId: "r1", phone: "+855 98 222 333" },
];

export const DORMS: Dorm[] = [
  { id: "d1", name: "North Hall", address: "123 University Ave, Phnom Penh", contact: "+855 23 456 789", totalRooms: 12, occupiedRooms: 8, mealCostMethod: "per_meal", billingCycle: "monthly", perMealRate: 2.5 },
  { id: "d2", name: "South Residence", address: "456 Campus Rd, Phnom Penh", contact: "+855 23 987 654", totalRooms: 8, occupiedRooms: 5, mealCostMethod: "proportional", billingCycle: "monthly", perMealRate: 3.0 },
];

export const ROOMS: Room[] = [
  { id: "r1", dormId: "d1", number: "101", capacity: 2, occupied: 2, monthlyRent: 150, status: "occupied", tenants: ["u2", "u8"] },
  { id: "r2", dormId: "d1", number: "102", capacity: 2, occupied: 1, monthlyRent: 150, status: "occupied", tenants: ["u3"] },
  { id: "r3", dormId: "d1", number: "103", capacity: 4, occupied: 1, monthlyRent: 120, status: "occupied", tenants: ["u4"] },
  { id: "r4", dormId: "d1", number: "104", capacity: 2, occupied: 1, monthlyRent: 150, status: "occupied", tenants: ["u6"] },
  { id: "r5", dormId: "d2", number: "201", capacity: 2, occupied: 1, monthlyRent: 180, status: "occupied", tenants: ["u7"] },
  { id: "r6", dormId: "d1", number: "105", capacity: 2, occupied: 0, monthlyRent: 150, status: "available", tenants: [] },
  { id: "r7", dormId: "d1", number: "106", capacity: 4, occupied: 0, monthlyRent: 120, status: "available", tenants: [] },
  { id: "r8", dormId: "d1", number: "107", capacity: 2, occupied: 0, monthlyRent: 150, status: "maintenance", tenants: [] },
  { id: "r9", dormId: "d1", number: "108", capacity: 2, occupied: 2, monthlyRent: 150, status: "occupied", tenants: [] },
  { id: "r10", dormId: "d1", number: "109", capacity: 4, occupied: 3, monthlyRent: 120, status: "occupied", tenants: [] },
  { id: "r11", dormId: "d1", number: "110", capacity: 2, occupied: 0, monthlyRent: 150, status: "available", tenants: [] },
  { id: "r12", dormId: "d1", number: "111", capacity: 2, occupied: 1, monthlyRent: 150, status: "occupied", tenants: [] },
];

const today = new Date();
const getDate = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
};
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const MEAL_PLANS: MealPlan[] = [
  {
    id: "mp1",
    dormId: "d1",
    weekStart: getDate(0),
    days: Array.from({ length: 7 }, (_, i) => ({
      date: getDate(i),
      dayName: dayNames[new Date(getDate(i)).getDay()],
      breakfast: ["Noodle Soup", "Rice Porridge", "Fried Rice", "Bread & Eggs", "Baguette Sandwich", "Pancakes", "Congee"][i],
      lunch: ["Grilled Fish", "Chicken Curry", "Stir-Fried Veggies", "Pork Soup", "Beef Stew", "Fried Chicken", "Spring Rolls"][i],
      dinner: ["Fried Rice", "Noodle Stir-fry", "Fish Amok", "Lok Lak", "Green Curry", "BBQ Pork", "Mixed Soup"][i],
    })),
  },
];

export const MEAL_TOGGLES: MealToggle[] = [
  { tenantId: "u2", date: getDate(0), breakfast: true, lunch: true, dinner: true },
  { tenantId: "u2", date: getDate(1), breakfast: true, lunch: false, dinner: true },
  { tenantId: "u2", date: getDate(2), breakfast: true, lunch: true, dinner: false },
  { tenantId: "u2", date: getDate(3), breakfast: false, lunch: true, dinner: true },
  { tenantId: "u2", date: getDate(4), breakfast: true, lunch: true, dinner: true },
  { tenantId: "u2", date: getDate(5), breakfast: false, lunch: false, dinner: true },
  { tenantId: "u2", date: getDate(6), breakfast: true, lunch: true, dinner: true },
  { tenantId: "u3", date: getDate(0), breakfast: true, lunch: true, dinner: true },
  { tenantId: "u3", date: getDate(1), breakfast: true, lunch: true, dinner: true },
  { tenantId: "u4", date: getDate(0), breakfast: true, lunch: true, dinner: false },
  { tenantId: "u6", date: getDate(0), breakfast: true, lunch: false, dinner: true },
];

export const MEAL_COUNTS: MealCount[] = Array.from({ length: 7 }, (_, i) => ({
  date: getDate(i),
  breakfast: Math.floor(Math.random() * 5) + 3,
  lunch: Math.floor(Math.random() * 5) + 4,
  dinner: Math.floor(Math.random() * 5) + 5,
}));

export const INVOICES: Invoice[] = [
  { id: "inv1", tenantId: "u2", tenantName: "Alex Rivera", month: "2026-03", rent: 150, mealCost: 52.5, adjustments: 0, total: 202.5, status: "pending", dueDate: "2026-03-31" },
  { id: "inv2", tenantId: "u2", tenantName: "Alex Rivera", month: "2026-02", rent: 150, mealCost: 60, adjustments: -10, total: 200, status: "paid", paidDate: "2026-02-28", dueDate: "2026-02-28" },
  { id: "inv3", tenantId: "u3", tenantName: "Srey Pov", month: "2026-03", rent: 150, mealCost: 45, adjustments: 0, total: 195, status: "pending", dueDate: "2026-03-31" },
  { id: "inv4", tenantId: "u4", tenantName: "Dara Kim", month: "2026-03", rent: 120, mealCost: 37.5, adjustments: 0, total: 157.5, status: "overdue", dueDate: "2026-03-15" },
  { id: "inv5", tenantId: "u6", tenantName: "Sreyleak Meas", month: "2026-03", rent: 150, mealCost: 50, adjustments: 5, total: 205, status: "pending", dueDate: "2026-03-31" },
  { id: "inv6", tenantId: "u3", tenantName: "Srey Pov", month: "2026-02", rent: 150, mealCost: 55, adjustments: 0, total: 205, status: "paid", paidDate: "2026-02-25", dueDate: "2026-02-28" },
  { id: "inv7", tenantId: "u7", tenantName: "Visal Sok", month: "2026-03", rent: 180, mealCost: 67.5, adjustments: 0, total: 247.5, status: "pending", dueDate: "2026-03-31" },
];

export const MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  { id: "mr1", tenantId: "u2", tenantName: "Alex Rivera", roomNumber: "101", title: "Leaking Faucet", description: "Bathroom faucet dripping constantly", category: "plumbing", status: "in_progress", priority: "medium", date: "2026-03-10" },
  { id: "mr2", tenantId: "u3", tenantName: "Srey Pov", roomNumber: "102", title: "AC Not Cooling", description: "Air conditioning unit not producing cold air", category: "hvac", status: "open", priority: "high", date: "2026-03-12" },
  { id: "mr3", tenantId: "u4", tenantName: "Dara Kim", roomNumber: "103", title: "Broken Desk Lamp", description: "Desk lamp stopped working", category: "electrical", status: "resolved", priority: "low", date: "2026-03-05" },
  { id: "mr4", tenantId: "u6", tenantName: "Sreyleak Meas", roomNumber: "104", title: "Wardrobe Door Hinge", description: "Wardrobe door hinge is loose", category: "furniture", status: "open", priority: "medium", date: "2026-03-13" },
];

export const ANNOUNCEMENTS: Announcement[] = [
  { id: "a1", dormId: "d1", title: "Fire Drill Scheduled", content: "A fire drill will take place on Monday at 10:00 AM. All residents must evacuate.", type: "urgent", date: "2026-03-14" },
  { id: "a2", dormId: "d1", title: "Laundry Room Update", content: "New washing machines have been installed in Basement A. Please follow the usage guidelines posted.", type: "info", date: "2026-03-12" },
  { id: "a3", dormId: "d1", title: "Meal Plan Changes", content: "Starting next week, breakfast will be served 30 minutes earlier at 6:30 AM.", type: "update", date: "2026-03-11" },
  { id: "a4", dormId: "d1", title: "Water Maintenance", content: "Water supply will be interrupted on Saturday 8-11 AM for pipe maintenance.", type: "urgent", date: "2026-03-09" },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    maxRooms: 3,
    mealFeatures: "Basic meal ON/OFF only",
    features: ["Room management", "Rent tracking", "Maintenance requests", "Up to 3 rooms"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 15,
    maxRooms: 20,
    mealFeatures: "Full meal management",
    popular: true,
    features: ["Everything in Starter", "Weekly meal planner", "Real-time meal counters", "Meal cost calculation", "PDF receipts", "Payment reminders", "Up to 20 rooms"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 45,
    maxRooms: -1,
    mealFeatures: "Advanced meal analytics",
    features: ["Everything in Growth", "Unlimited rooms", "Chef role support", "Multi-dorm management", "API access", "Custom branding", "Priority support"],
  },
];

// ==================== FINANCIAL DATA FOR CHARTS ====================
export const FINANCIAL_DATA = [
  { month: "Oct", income: 2800, expenses: 1200 },
  { month: "Nov", income: 3100, expenses: 1400 },
  { month: "Dec", income: 2900, expenses: 1100 },
  { month: "Jan", income: 3200, expenses: 1500 },
  { month: "Feb", income: 3400, expenses: 1300 },
  { month: "Mar", income: 3000, expenses: 1600 },
];

export const MEAL_CONSUMPTION_DATA = [
  { day: "Mon", breakfast: 6, lunch: 7, dinner: 8 },
  { day: "Tue", breakfast: 5, lunch: 8, dinner: 7 },
  { day: "Wed", breakfast: 7, lunch: 6, dinner: 9 },
  { day: "Thu", breakfast: 4, lunch: 7, dinner: 8 },
  { day: "Fri", breakfast: 6, lunch: 8, dinner: 7 },
  { day: "Sat", breakfast: 3, lunch: 5, dinner: 6 },
  { day: "Sun", breakfast: 4, lunch: 6, dinner: 7 },
];

export const OCCUPANCY_DATA = [
  { name: "Occupied", value: 8, fill: "hsl(226, 70%, 55%)" },
  { name: "Available", value: 3, fill: "hsl(142, 53%, 45%)" },
  { name: "Maintenance", value: 1, fill: "hsl(28, 90%, 56%)" },
];

export const TENANT_MEAL_HISTORY = [
  { week: "W1", meals: 18, cost: 45 },
  { week: "W2", meals: 20, cost: 50 },
  { week: "W3", meals: 15, cost: 37.5 },
  { week: "W4", meals: 21, cost: 52.5 },
];
