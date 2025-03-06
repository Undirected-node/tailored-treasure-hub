import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type OrderStatus = "Received" | "In Progress" | "Ready" | "Delivered";

export interface OrderProps {
  id: string;
  customer: string;
  orderDate: string;
  deliveryDate: string;
  items: string[];
  status: OrderStatus;
  price: number;
  onClick?: () => void;
  order: {
    id: string;
    customerName: string;
    orderDate: string;
    deliveryDate: string;
    items: string;
    status: string;
    price: string;
  };
  onStatusChange: (newStatus: string) => void;
}

export function OrderCard({
  id,
  customer,
  orderDate,
  deliveryDate,
  items = [],
  status,
  price,
  onClick
}: OrderProps) {
  const getStatusColor = (status: OrderStatus) => {
    switch(status) {
      case "Received": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Ready": return "bg-green-100 text-green-800";
      case "Delivered": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <Card className="card-hover overflow-hidden animate-enter w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{customer}</CardTitle>
            <CardDescription>Order #{id}</CardDescription>
          </div>
          <Badge className={cn("ml-2", getStatusColor(status))}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1 text-sm">
            <span className="text-muted-foreground">Order Date:</span>
            <span>{orderDate}</span>
            <span className="text-muted-foreground">Delivery Date:</span>
            <span>{deliveryDate}</span>
          </div>
          <div className="mt-3">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Items:</h4>
            <ul className="text-sm space-y-1">
              {items && items.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="font-medium">${price.toFixed(2)}</div>
        <Button variant="outline" onClick={onClick}>View Details</Button>
      </CardFooter>
    </Card>
  );
}
