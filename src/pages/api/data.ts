import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "src/lib/supabaseClient";

// eslint-disable-next-line import/no-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase.from("panels").select("*");

  if (error) {
    return res.status(500).json({ message: "Could not get data from Supabase." });
  }
  res.status(200).json({ panels: data });
};
