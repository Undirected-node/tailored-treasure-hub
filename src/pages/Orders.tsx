
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { OrderCard, OrderProps } from "@/components/OrderCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

// Mock orders data
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
  {
    id: "ORD-1236",
    customer: "Michael Brown",
    orderDate: "2023-05-08",
    deliveryDate: "2023-05-18",
    items: ["Trousers", "Blazer"],
    status: "Ready",
    price: 245.00,
  },
  {
    id: "ORD-1237",
    customer: "Sophia Chen",
    orderDate: "2023-05-05",
    deliveryDate: "2023-05-15",
    items: ["Wedding Dress Alterations"],
    status: "Delivered",
    price: 520.75,
  },
  {
    id: "ORD-1238",
    customer: "Robert Wilson",
    orderDate: "2023-05-11",
    deliveryDate: "2023-05-21",
    items: ["Formal Shirt", "Waistcoat"],
    status: "Received",
    price: 195.25,
  },
];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Filter orders based on search term and status
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">Orders</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all customer orders
            </p>
          </div>
          <Button className="mt-4 md:mt-0" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer or order ID..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} {...order} onClick={() => console.log("View order", order.id)} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No orders found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;
