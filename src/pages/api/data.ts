import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "src/lib/supabaseClient";

// eslint-disable-next-line import/no-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase.from("panels").select("*");
  res.status(200).json({ panels: data });
};
