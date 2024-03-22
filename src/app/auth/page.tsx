
import React from 'react';
import type { ParsedUrlQuery } from 'querystring';

import { getParam } from '@/shared/modal';
import { AuthPage } from '@/page';
import { ROUTES } from '@/shared/constants';
import { Metadata } from 'next';

interface PageProps {
    searchParams: ParsedUrlQuery;
}

const Authorize = ({searchParams}: PageProps) => {
    const callbackUrl = getParam(searchParams.callbackUrl) ?? ROUTES.HOME.get();
    const error = getParam(searchParams.error);

    return (
        <AuthPage callbackUrl={callbackUrl} error={error} />
    );
};

export const metadata: Metadata = {
    title: "Authorize",
    description: "Track your academic performance",
    authors: [
      {
        name: 'Dastan Rinatuly',
        url: 'https://tynyshtyq.blog',
      },
    ]
};

export default Authorize;