'use server';

import PCC from '@/server/PCC';

import { createAction } from '@/utils/action';
import { z } from 'zod';

export const searchSchema = z.object({
    query: z.string()
});


type SearchSchema = z.infer<typeof searchSchema>;

export const search = createAction({
    schema: searchSchema,
    ctx: () => {},
    action: async (input: SearchSchema) => {
        const { query } = input;
        // const data = await PCC.search(query);
        const data = await setTimeout(() => {return []}, 5000)
        return data;
    }
});