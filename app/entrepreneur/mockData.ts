export const mockBusiness = {
  ownerName: "Lindiwe Mbeki",
  email: "lindiwe@khayapantry.co.za",
  businessName: "Khaya Pantry & Fresh Produce",
  industry: "Food, grocery and fresh produce retail",
  businessLocation: "Mdantsane, Eastern Cape",
  businessDescription:
    "Khaya Pantry is a neighbourhood food and fresh produce business serving commuters, families and small catering buyers. The business combines daily grocery staples with locally sourced vegetables and weekend meal packs.",
  employeeCount: "4",
  yearsInOperation: "3 years",
  founded: "2023",
  monthlyRevenue: "R24,500",
  monthlyExpenses: "R8,200",
  netProfit: "R16,300",
  readiness: 82,
  profileStrength: 88,
  documentScore: 74,
  salesConsistency: 69,
  storefrontScore: 91,
  repeatCustomers: 46,
  averageOrder: "R86",
  cashflowHealth: 78,
  growthRate: "+18%",
};

export const mockTransactions = [
  { date: "05 Sep", description: "Morning grocery sales", amount: "+R1,860", type: "sale" },
  { date: "04 Sep", description: "Vegetable stock refill", amount: "-R720", type: "expense" },
  { date: "03 Sep", description: "Weekend meal pack orders", amount: "+R2,450", type: "sale" },
  { date: "02 Sep", description: "Packaging and labels", amount: "-R310", type: "expense" },
];

export const mockTasks = [
  { title: "Business profile", completed: true, progress: 100, metric: "Core identity complete" },
  { title: "Registration and ID documents", completed: true, progress: 100, metric: "Verified proof uploaded" },
  { title: "Record 30 days of sales", completed: false, progress: 73, metric: "22 of 30 days captured" },
  { title: "Upload latest bank statement", completed: false, progress: 40, metric: "August uploaded, September due" },
];

export const mockSalesMix = [
  { label: "Grocery staples", value: 42 },
  { label: "Fresh produce", value: 31 },
  { label: "Meal packs", value: 18 },
  { label: "Delivery orders", value: 9 },
];
