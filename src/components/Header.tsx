import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

const Header = () => (
    <nav className="p-5 border-b-2 border-color-white flex flex-row justify-between items-center">
        <h1 className="py-4 px-4 font-bold text-3xl center text-white">UNLIMITED</h1>
        <div className="flex flex-row items-center">
            <div className="flex justify-start px-4">
                <Link href="/">
                    <h2 className="px-4 text-xl text-white">MINT NFT</h2>
                </Link>
                <Link href="/soulbound">
                    <h2 className="px-4 text-xl text-white">SOULBOUND</h2>
                </Link>
            </div>
            <ConnectButton />
        </div>
    </nav>
)

export default Header
