
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";

export interface MeasurementProps {
  id: string;
  name: string;
  date: string;
  lastUpdated: string;
  measurements: {
    label: string;
    value: string;
  }[];
  onClick?: () => void;
}

export function MeasurementCard({
  id,
  name,
  date,
  lastUpdated,
  measurements,
  onClick
}: MeasurementProps) {
  return (
    <Card className="card-hover animate-enter w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <CalendarIcon className="h-3 w-3 mr-1" />
              Last updated: {lastUpdated}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2">
            ID: {id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
          {measurements.slice(0, 6).map((measurement, index) => (
            <div key={index} className="text-sm">
              <span className="block text-muted-foreground">{measurement.label}:</span>
              <span className="font-medium">{measurement.value}</span>
            </div>
          ))}
          {measurements.length > 6 && (
            <div className="text-sm text-muted-foreground">
              +{measurements.length - 6} more
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full" onClick={onClick}>
          View All Measurements
        </Button>
      </CardFooter>
    </Card>
  );
}
