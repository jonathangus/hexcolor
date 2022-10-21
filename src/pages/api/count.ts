import { NextApiHandler } from 'next';
import { createClient } from '@supabase/supabase-js';
import { SiweMessage } from 'siwe';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const handler: NextApiHandler = async (req, res) => {
  try {
    const { message, signature, bio } = req.body;
    const siweMessage = new SiweMessage(message);
    const validate = await siweMessage.validate(signature);
    if (!validate) {
      return res.status(500).send('invalid signer');
    }

    const { color } = req.body;
    let current;
    try {
      const { data } = await supabase
        .from('colors')
        .select('id, count')
        .eq('id', color)
        .limit(1)
        .single();
      current = data;
    } catch (e) {}

    let count;
    if (current) {
      count = current.count + 1;
      await supabase.from('colors').update({ id: color, count });
    } else {
      count = 1;
      await supabase.from('colors').insert({ id: color, count });
    }

    res.status(200).send({
      count,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

export default handler;
