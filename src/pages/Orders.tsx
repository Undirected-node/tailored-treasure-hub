import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { OrderCard, OrderProps } from "@/components/OrderCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [newOrder, setNewOrder] = useState({
    id: "",
    customer: "",
    measurementId:"",
    orderDate: new Date().toISOString().split("T")[0],
    deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    items: "",
    status: "Received",
    price: ""
  });

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleCreateOrder = () => {

  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">Orders</h1>
            <p className="text-muted-foreground mt-1">Manage and track all customer orders</p>
          </div>
          <Button className="mt-4 md:mt-0" size="sm" onClick={() => navigate("/new-order")}> 
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-medium">Create New Order</h2>
            <Input name="id" placeholder="Order ID" value={newOrder.id} onChange={handleInputChange} className="mb-2" />
            <Input name="customer" placeholder="Customer Name" value={newOrder.customer} onChange={handleInputChange} className="mb-2" />
            <Input name="items" placeholder="Items (comma-separated)" value={newOrder.items} onChange={handleInputChange} className="mb-2" />
            <Input name="price" placeholder="Price" value={newOrder.price} onChange={handleInputChange} className="mb-2" />
            <Select name="status" value={newOrder.status} onValueChange={(value) => setNewOrder({ ...newOrder, status: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Received">Received</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Ready">Ready</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <Button className="mt-4" onClick={handleCreateOrder}>Confirm Order</Button>
          </div>
          <div>
            <h2 className="text-xl font-medium">Orders List</h2>
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard key={order.id} {...order} />
              ))
            ) : (
              <p className="text-muted-foreground">No orders found matching your criteria.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orders;