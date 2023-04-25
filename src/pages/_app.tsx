import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { polygonMumbai } from 'wagmi/chains'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'

const { chains, provider } = configureChains([polygonMumbai], [publicProvider()])

const { connectors } = getDefaultWallets({
    appName: 'UNLIMITED',
    chains,
})

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
                coolMode
                showRecentTransactions={true}
                theme={darkTheme({
                    accentColor: '#121212',
                })}
                chains={chains}
            >
                <Header />
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
