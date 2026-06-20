"use client";

import { Suspense } from "react";
import LoginFormPraktikan from "@/app/components/auth/LoginFormPraktikan";

export default function PraktikanLoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Suspense fallback={<div className="text-gray-500">Loading Form...</div>}>
        <LoginFormPraktikan />
      </Suspense>
    </main>
  );
}
