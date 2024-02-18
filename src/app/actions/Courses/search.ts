'use server';

import PCC from '@/entities/registrar';



import { createAction } from '@/utils/action';
import { z } from 'zod';

const searchSchema = z.object({
    query: z.string()
});


type SearchSchema = z.infer<typeof searchSchema>;

export const search = createAction({
    schema: searchSchema,
    ctx: () => {},
    action: async (input: SearchSchema) => {
        const { query } = input;
        const data = await PCC.search(query);
        return data;
    }
});