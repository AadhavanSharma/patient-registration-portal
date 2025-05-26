import { PGliteProvider } from "@electric-sql/pglite-react";

import db from "@/lib/db";
import LandingPage from "@/landingPage";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <PGliteProvider db={db}>
      <Toaster />
      <LandingPage />
    </PGliteProvider>
  );
}
