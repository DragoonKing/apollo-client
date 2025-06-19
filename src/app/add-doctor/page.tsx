"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertDoctorSchema, type InsertDoctor } from "@shared/schema";
import { UserPlus, Stethoscope } from "lucide-react";

const formSchema = insertDoctorSchema.extend({
  reviewCount: insertDoctorSchema.shape.reviewCount.optional(),
});

export default function AddDoctorPage() {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertDoctor>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      specialty: "General Physician",
      gender: "male",
      city: "",
      experience: 0,
      rating: 0,
      image: "",
      hospital: "",
      fee: 0,
      reviewCount: 0,
    },
  });

  const addDoctorMutation = useMutation({
    mutationFn: async (data: InsertDoctor) => {
      const response = await fetch("/api/add-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to add doctor");

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Doctor has been added successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/list-doctor-with-filter"] });
      form.reset();
      setTimeout(() => {
        router.push("/doctors/general-physician-internal-medicine");
      }, 1500);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to add doctor. Please try again.";

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertDoctor) => {
    addDoctorMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2 flex items-center">
            <UserPlus className="h-8 w-8 mr-3 text-blue-600" />
            Add New Doctor
          </h1>
          <p className="text-neutral-600">
            Add a new doctor to the platform with their professional details.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
              Doctor Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Dr. John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Specialty */}
                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialty *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select specialty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "General Physician",
                              "Internal Medicine",
                              "Cardiology",
                              "Dermatology",
                              "Pediatrics",
                              "Orthopedics",
                              "Neurology",
                              "Psychiatry",
                            ].map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* City */}
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "Mumbai",
                              "Delhi",
                              "Bangalore",
                              "Pune",
                              "Chennai",
                              "Hyderabad",
                              "Kolkata",
                              "Ahmedabad",
                            ].map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Experience */}
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience (Years) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Rating */}
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (0-5) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            placeholder="4.5"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Hospital */}
                <FormField
                  control={form.control}
                  name="hospital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hospital/Clinic</FormLabel>
                      <FormControl>
                        <Input placeholder="Apollo Hospital" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Image URL */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image URL *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/doctor-photo.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Fee */}
                  <FormField
                    control={form.control}
                    name="fee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consultation Fee (₹) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="500"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Review Count */}
                  <FormField
                    control={form.control}
                    name="reviewCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Reviews</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="100"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      router.push("/doctors/general-physician-internal-medicine")
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={addDoctorMutation.isPending}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {addDoctorMutation.isPending ? "Adding Doctor..." : "Add Doctor"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
