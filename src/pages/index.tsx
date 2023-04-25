import Head from 'next/head'

import Header from '../components/Header'
import MintNft from '../components/MintNft'

export default function Home() {
    return (
        <>
            <Head>
                <title>UNLIMITED</title>
                <meta
                    name="description"
                    content="Unlimited project demo"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>
            <main>
                <MintNft />
            </main>
        </>
    )
}
