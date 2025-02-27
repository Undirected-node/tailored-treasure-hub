
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { MeasurementCard, MeasurementProps } from "@/components/MeasurementCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

// Mock measurements data
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
  {
    id: "MS-002",
    name: "Emma Johnson",
    date: "2023-04-20",
    lastUpdated: "2023-04-20",
    measurements: [
      { label: "Bust", value: "36 in" },
      { label: "Waist", value: "29 in" },
      { label: "Hips", value: "38 in" },
      { label: "Sleeve", value: "23.5 in" },
      { label: "Shoulder", value: "16 in" },
      { label: "Back Length", value: "17 in" },
      { label: "Front Length", value: "16 in" },
    ],
  },
  {
    id: "MS-003",
    name: "Michael Brown",
    date: "2023-04-18",
    lastUpdated: "2023-05-02",
    measurements: [
      { label: "Chest", value: "44 in" },
      { label: "Waist", value: "36 in" },
      { label: "Hips", value: "42 in" },
      { label: "Sleeve", value: "26 in" },
      { label: "Shoulder", value: "19 in" },
      { label: "Neck", value: "17 in" },
      { label: "Inseam", value: "34 in" },
    ],
  },
  {
    id: "MS-004",
    name: "Sophia Chen",
    date: "2023-05-01",
    lastUpdated: "2023-05-01",
    measurements: [
      { label: "Bust", value: "34 in" },
      { label: "Waist", value: "27 in" },
      { label: "Hips", value: "36 in" },
      { label: "Sleeve", value: "22 in" },
      { label: "Shoulder", value: "15 in" },
      { label: "Back Length", value: "16 in" },
    ],
  },
];

const Measurements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Filter measurements based on search term
  const filteredMeasurements = mockMeasurements.filter((measurement) => 
    measurement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    measurement.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">Measurements</h1>
            <p className="text-muted-foreground mt-1">
              Store and manage customer measurements
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0" 
            size="sm"
            onClick={() => navigate("/measurements/add")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Measurement
          </Button>
        </div>
        
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name or ID..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeasurements.length > 0 ? (
            filteredMeasurements.map((measurement) => (
              <MeasurementCard 
                key={measurement.id} 
                {...measurement} 
                onClick={() => console.log("View measurement", measurement.id)} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No measurements found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Measurements;
