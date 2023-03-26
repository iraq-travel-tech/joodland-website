import Head from 'next/head';
import React, { FC } from 'react';

interface TitleProperties {
    title?: string;
}

const Title: FC<TitleProperties>= ({ title }) => {
    return (

        <Head>
            <title>{title}</title>
        </Head>
    );
}

export default Title;