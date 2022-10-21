import { NextApiHandler } from 'next';
import { createClient } from '@supabase/supabase-js';
import { SiweMessage } from 'siwe';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const handler: NextApiHandler = async (req, res) => {
  try {
    const { color } = req.query;
    const { data } = await supabase
      .from('colors')
      .select('id, count')
      .eq('id', color)
      .limit(1)
      .single();

    res.status(200).send({
      count: data.count || 0,
    });
  } catch (e) {
    res.status(200).send({
      count: 0,
    });
  }
};

export default handler;
