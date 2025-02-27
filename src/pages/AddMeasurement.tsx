
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Ruler, 
  Save,
  User,
  Calendar,
  CircleDot,
  Hourglass,
  MoveHorizontal,
  MoveVertical,
  Shirt,
  Scissors
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddMeasurement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [measurements, setMeasurements] = useState({
    bust: "",
    waist: "",
    hips: "",
    shoulder: "",
    sleeve: "",
    neck: "",
    backLength: "",
    frontLength: "",
    inseam: "",
    thigh: "",
    notes: ""
  });

  const handleChange = (field: string, value: string) => {
    setMeasurements({
      ...measurements,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!customerName) {
      toast({
        title: "Missing information",
        description: "Please enter the customer name",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, this would save to a database
    toast({
      title: "Measurements saved",
      description: `Measurements for ${customerName} have been saved successfully.`
    });
    
    // Navigate back to measurements list
    setTimeout(() => {
      navigate("/measurements");
    }, 1500);
  };

  const measurementFields = [
    { name: "bust", label: "Bust/Chest", icon: <Shirt className="text-muted-foreground" /> },
    { name: "waist", label: "Waist", icon: <MoveHorizontal className="text-muted-foreground" /> },
    { name: "hips", label: "Hips", icon: <MoveHorizontal className="text-muted-foreground" /> },
    { name: "shoulder", label: "Shoulder", icon: <MoveHorizontal className="text-muted-foreground" /> },
    { name: "sleeve", label: "Sleeve Length", icon: <MoveVertical className="text-muted-foreground" /> },
    { name: "neck", label: "Neck", icon: <CircleDot className="text-muted-foreground" /> },
    { name: "backLength", label: "Back Length", icon: <MoveVertical className="text-muted-foreground" /> },
    { name: "frontLength", label: "Front Length", icon: <MoveVertical className="text-muted-foreground" /> },
    { name: "inseam", label: "Inseam", icon: <Ruler className="text-muted-foreground" /> },
    { name: "thigh", label: "Thigh", icon: <Scissors className="text-muted-foreground" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate("/measurements")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Measurements
          </Button>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-medium tracking-tight">Add New Measurements</h1>
              <p className="text-muted-foreground mt-1">
                Enter customer measurements with precision
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-medium mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-muted-foreground">
                      <User className="h-4 w-4" />
                    </div>
                    <Input 
                      id="customerName"
                      placeholder="Enter customer name"
                      className="pl-10"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <Input 
                      id="date"
                      type="date"
                      className="pl-10"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-medium mb-4">Measurements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {measurementFields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name} className="flex items-center gap-1.5">
                      {field.icon}
                      {field.label}
                    </Label>
                    <div className="relative">
                      <Input 
                        id={field.name}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        value={measurements[field.name as keyof typeof measurements]}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                      />
                      <div className="absolute right-3 top-3 text-muted-foreground text-sm">
                        in
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes"
                  placeholder="Enter any additional information about the measurements"
                  value={measurements.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => navigate("/measurements")}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save Measurements
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddMeasurement;
