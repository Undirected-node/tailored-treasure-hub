
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, CreditCard, Edit, Mail, MapPin, Phone, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSaveProfile = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80" />
                <AvatarFallback>TS</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-medium tracking-tight">Tailor Shop</h1>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="mr-2">Premium Plan</Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" /> New York, NY
                  </span>
                </div>
              </div>
            </div>
            <Button 
              variant="outline"
              className="mt-4 md:mt-0"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </Button>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>
                    Manage your business details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input 
                        id="businessName" 
                        defaultValue="Premium Tailor Shop"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessEmail">Email</Label>
                      <Input 
                        id="businessEmail" 
                        defaultValue="contact@premiumtailor.com"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessPhone">Phone</Label>
                      <Input 
                        id="businessPhone" 
                        defaultValue="+1 (555) 123-4567"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessWebsite">Website</Label>
                      <Input 
                        id="businessWebsite" 
                        defaultValue="www.premiumtailor.com"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">Address</Label>
                    <Textarea 
                      id="businessAddress"
                      defaultValue="123 Fashion Street, Suite 456, New York, NY 10001"
                      disabled={!isEditing}
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessDescription">Description</Label>
                    <Textarea 
                      id="businessDescription"
                      defaultValue="Premium tailoring services with over 15 years of experience. Specializing in formal wear, wedding attire, and custom suits."
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                  
                  {isEditing && (
                    <Button onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                  <CardDescription>
                    Set your regular business hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="font-medium">Day</div>
                      <div className="font-medium">Opening Time</div>
                      <div className="font-medium">Closing Time</div>
                      
                      <div>Monday - Friday</div>
                      <div>9:00 AM</div>
                      <div>6:00 PM</div>
                      
                      <div>Saturday</div>
                      <div>10:00 AM</div>
                      <div>4:00 PM</div>
                      
                      <div>Sunday</div>
                      
                    </div>
                    
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        Edit Business Hours
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-start space-x-4">
                      <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Password</div>
                        <div className="text-sm text-muted-foreground">
                          Last changed 3 months ago
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-t">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-t">
                    <div className="flex items-start space-x-4">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Phone Verification</div>
                        <div className="text-sm text-muted-foreground">
                          Verify your phone number for notifications
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Verify
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-accent/50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Premium Plan</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Unlimited orders, customers, and measurements
                        </p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="mt-4 text-sm flex items-center text-muted-foreground">
                      <CalendarClock className="h-4 w-4 mr-2" />
                      Next billing date: June 15, 2023
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-t">
                    <div className="flex items-start space-x-4">
                      <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Payment Method</div>
                        <div className="text-sm text-muted-foreground">
                          Visa ending in 4242
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                  
                  <div className="border-t pt-4">
                    <Button variant="outline" className="w-full">
                      View Billing History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
