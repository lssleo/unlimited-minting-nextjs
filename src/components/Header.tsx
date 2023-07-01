import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

const Header = () => (
    <nav className="p-5 border-b-2 border-color-white flex flex-row justify-between items-center">
        <h1 className="py-2 px-2 font-bold text-1l center text-white sm:hidden">UNLIM</h1>
        <h1 className="py-2 px-2 font-bold text-1l center text-white hidden sm:block">UNLIMITED</h1>
        <div className="flex flex-row items-center">
            <div className="flex justify-start px-4">
                <Link href="/">
                    <h2 className="px-2 text-s text-white sm:hidden">MINT</h2>
                    <h2 className="px-2 text-s text-white hidden sm:block">MINT NFT</h2>
                </Link>
                <Link href="/soulbound">
                    <h2 className="px-2 text-s text-white sm:hidden">SBT</h2>
                    <h2 className="px-2 text-s text-white hidden sm:block">SOULBOUND</h2>
                </Link>
            </div>
            <div className="hidden sm:block">
                <ConnectButton label="Connect" />
            </div>
            <div className="block sm:hidden">
                <ConnectButton label="Co..." />
            </div>
        </div>
    </nav>
)

export default Header
