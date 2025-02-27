
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { MeasurementCard, MeasurementProps } from "@/components/MeasurementCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

const Measurements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [measurements, setMeasurements] = useState<MeasurementProps[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load measurements from localStorage when component mounts
    const storedMeasurements = localStorage.getItem("measurements");
    if (storedMeasurements) {
      setMeasurements(JSON.parse(storedMeasurements));
    }
  }, []);
  
  // Filter measurements based on search term
  const filteredMeasurements = measurements.filter((measurement) => 
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
              <p className="text-muted-foreground">No measurements found. Add your first measurement to get started.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Measurements;
