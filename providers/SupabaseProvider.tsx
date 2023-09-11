"use client";

import { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { FC, ReactNode, useState } from "react";

interface SupabaseProviderProps {
  children: ReactNode;
}

export const SupabaseProvider: FC<SupabaseProviderProps> = ({ children }) => {
  const [supabaseClient, setSupabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};
