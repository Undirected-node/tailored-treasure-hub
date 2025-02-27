
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { OrderCard, OrderProps } from "@/components/OrderCard";
import { MeasurementCard, MeasurementProps } from "@/components/MeasurementCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Package, ShoppingBag, TrendingUp } from "lucide-react";

// Mock data - would be fetched from API in a real app
const mockOrders: OrderProps[] = [
  {
    id: "ORD-1234",
    customer: "John Smith",
    orderDate: "2023-05-10",
    deliveryDate: "2023-05-20",
    items: ["Business Suit", "White Shirt"],
    status: "In Progress",
    price: 349.99,
  },
  {
    id: "ORD-1235",
    customer: "Emma Johnson",
    orderDate: "2023-05-12",
    deliveryDate: "2023-05-22",
    items: ["Evening Dress", "Alterations"],
    status: "Received",
    price: 289.50,
  },
];

const mockMeasurements: MeasurementProps[] = [
  {
    id: "MS-001",
    name: "John Smith",
    date: "2023-04-15",
    lastUpdated: "2023-04-15",
    measurements: [
      { label: "Chest", value: "42 in" },
      { label: "Waist", value: "34 in" },
      { label: "Hips", value: "40 in" },
      { label: "Sleeve", value: "25 in" },
      { label: "Shoulder", value: "18 in" },
      { label: "Neck", value: "16 in" },
      { label: "Inseam", value: "32 in" },
      { label: "Thigh", value: "24 in" },
    ],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Stats data
  const stats = [
    { title: "Total Orders", value: "24", icon: <ShoppingBag className="h-4 w-4" />, change: "+12% from last month" },
    { title: "In Progress", value: "8", icon: <Clock className="h-4 w-4" />, change: "3 due this week" },
    { title: "Ready for Delivery", value: "5", icon: <Package className="h-4 w-4" />, change: "2 awaiting pickup" },
    { title: "Monthly Revenue", value: "$4,320", icon: <TrendingUp className="h-4 w-4" />, change: "+8% from last month" },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <header className="mb-8">
          <h1 className="text-3xl font-medium tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your tailoring business
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-enter animation-delay-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Recent Orders</h2>
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => navigate("/orders")}
              >
                View all orders
              </Button>
            </div>
            
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="w-full h-[220px] animate-pulse bg-muted"></Card>
                  ))}
                </div>
              ) : (
                mockOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    {...order}
                    onClick={() => navigate(`/orders/${order.id}`)}
                  />
                ))
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Recent Measurements</h2>
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => navigate("/measurements")}
              >
                View all
              </Button>
            </div>
            
            {isLoading ? (
              <Card className="w-full h-[220px] animate-pulse bg-muted"></Card>
            ) : (
              <div className="space-y-4">
                {mockMeasurements.map((measurement) => (
                  <MeasurementCard
                    key={measurement.id}
                    {...measurement}
                    onClick={() => navigate(`/measurements/${measurement.id}`)}
                  />
                ))}
              </div>
            )}
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                <CardDescription>Orders due soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <CalendarIcon className="h-3 w-3 text-red-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Business Suit - John Smith</p>
                      <p className="text-xs text-muted-foreground">Due in 3 days</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                      <CalendarIcon className="h-3 w-3 text-yellow-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Evening Dress - Emma Johnson</p>
                      <p className="text-xs text-muted-foreground">Due in 5 days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
