
import React from 'react';
import type { ParsedUrlQuery } from 'querystring';

import { getParam } from '@/shared/modal';
import { AuthPage } from '@/page';
import { ROUTES } from '@/shared/constants';

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

export default Authorize;