import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PatientRegistrationForm from "@/components/patient-registration-form";
import PatientRecords from "@/components/patient-records";
import SqlQueryInterface from "@/components/sql-query-interface";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("register");
  return (
    <main className="container mx-auto py-8 px-4">
      <CardHeader className="h-24 w-full bg-gray-200 shadow-lg rounded-3xl m-4 relative right-4 border-gray-300 border-6 bottom-6 flex justify-around items-center">
        <img src = "../../public/logo.png" className="h-16"></img>
        <h1 className="text-4xl font-bold text-center relative right-48">
        Medblocks!
        </h1>
        <h4 className="text-2xl text-center">
          Platform to manage patient records and data retrieval
        </h4>
        </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative bottom-6">
        <TabsList className="flex justify-start w-full overflow-auto no-scrollbar ">
          <div className="w-full flex flex-row gap-1 bg-gray-200">
            <TabsTrigger value="records">DATA ACCESS</TabsTrigger>
            <TabsTrigger value="register">ADD A NEW PATIENT</TabsTrigger>
            <TabsTrigger value="query">CUSTOMIZED ACCESS TO DATA</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="register"> 
          <Card>
            <CardHeader className=" text-center">
              <CardTitle>Add a New Patient</CardTitle>
              <CardDescription className="text-center font-bold uppercase font-mono ">
                Feed the data for Creating a new patient record
              </CardDescription>
              <CardDescription className="text-center text-red-500 font-bold relative left-120">
                FIELDS MARKED WITH * (asterisk) ARE REQUIRED FOR SUBMISSION.
                </CardDescription>
            </CardHeader>
            <CardContent>
              <PatientRegistrationForm
                onRegistered={() => setActiveTab("records")}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle className="text-center uppercase">Patients Data Access</CardTitle>
              <CardDescription className="text-center uppercase">
                Retrieve/Delete patient records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PatientRecords />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="query">
          <Card>
            <CardHeader className="text-center uppercase">
              <CardTitle>Filter the data</CardTitle>
              <CardDescription className="text-center uppercase">
                Use SQL queries to filter and analyze patient data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SqlQueryInterface />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
