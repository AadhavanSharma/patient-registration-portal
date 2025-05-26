import { useState } from "react";

import { BLOOD_TYPES, GENDER_OPTIONS } from "@/lib/constants";
import type { z } from "zod";
import { patientSchema } from "@/lib/zod";
import { insertPatient } from "@/lib/db";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRequired,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type FormValues = z.infer<typeof patientSchema>;

interface PatientRegistrationFormProps {
  onRegistered: () => void;
}

export default function PatientRegistrationForm({
  onRegistered,
}: PatientRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      bloodType: "",
      medicalHistory: "",
      languagePreference: "",
      emergencyContact: "",
      nationalId: "",
      insuranceProvider: "",
      insuranceNumber: "",
      notes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await insertPatient({
        first_name: data.firstName,
        last_name: data.lastName,
        date_of_birth: data.dateOfBirth.toISOString().split("T")[0],
        gender: data.gender,
        email: data.email || null,
        phone: data.phone,
        address: data.address,
        blood_type: data.bloodType , // null
        medical_history: data.medicalHistory || null,
        language_preference: data.languagePreference , // null
        emergency_contact: data.emergencyContact , // null
        national_id: data.nationalId , // null
        insurance_provider: data.insuranceProvider || null,
        insurance_number: data.insuranceNumber || null,
        notes: data.notes || null,
        registration_date: new Date().toISOString().split("T")[0],
      });

      toast.success("Patient Registered", {
        description: `${data.firstName} ${data.lastName} has been successfully registered.`,
      });

      form.reset();
      onRegistered();
    } catch (error) {
      console.error("Error registering patient:", error);
      toast.error("Registration Failed", {
        description:
          "Error was occured while generating the patient. Please try again!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name
                  <FormRequired />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Tywin/Cersei/Tyrion . . ." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input placeholder="Middle Name (if any ... )" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name
                  <FormRequired />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Lannister/Stark/Baratheon . . ." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Gender
                  <FormRequired />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GENDER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bloodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Blood Group
                  <FormRequired />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BLOOD_TYPES.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Date of Birth
                  <FormRequired />
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="languagePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mother Tongue<FormRequired /></FormLabel>
                <FormControl>
                  <Input placeholder="Hindi/English/Kannada/Telugu . . ." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="myEmailID@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  National ID
                  <FormRequired />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Aadhar Card/Driving License No/PAN Card" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone Number
                  <FormRequired />
                </FormLabel>
                <FormControl>
                  <Input placeholder="9087654321" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact
                  <FormRequired /></FormLabel>
                <FormControl>
                  <Input placeholder="9087654321" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies</FormLabel>
              <FormControl>
                <Textarea placeholder="Rashes/Asthama . . ." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="medicalHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical History</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any Past surgeries/Chronic conditions . . . "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Address
                <FormRequired />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="1oth Downing Street, London . . ."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" shadow-lg bg-gray-100 p-2 rounded-lg flex justify-center items-center">
        <Button type="submit" className="w-60 bg-red-700 hover:bg-red-900 cursor-pointer" disabled={isSubmitting}>
          {isSubmitting ? "Submitting . . ." : "Submit"}
        </Button>
        </div>
      </form>
    </Form>
  );
}
