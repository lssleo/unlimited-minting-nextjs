import { ChangeEvent, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import MinterAbi from '../constants/MinterAbi.json'
import RegistryAbi from '../constants/RegistryAbi.json'
import RandomAbi from '../constants/RandomAbi.json'
import Loader from './Loader'
import ImageModalNft from './ImageModalNft'

import {
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useAccount,
    useContractEvent,
} from 'wagmi'

import { ethers } from 'ethers'

const registryAddress = '0x0cdC919cE4e4342Fdf5BEAA122a88982Fe8c921d'

export default function MintNft() {
    const [mintPrice, setMintPrice] = useState('')
    const [jsonLink, setJsonLink] = useState('')
    const [tokenId, setTokenId] = useState('')
    const [nftReady, setNftReady] = useState(false)
    const [waitingForNft, setWaitingForNft] = useState(false)

    const { address: connectedAddress, isConnecting, isDisconnected } = useAccount()

    const { data: MinterAddress } = useContractRead({
        address: registryAddress,
        abi: RegistryAbi,
        functionName: 'getMinterAddress',
    })

    const { data: RandomAddress } = useContractRead({
        address: registryAddress,
        abi: RegistryAbi,
        functionName: 'getRandomAddress',
    })

    const { data: MintPrice } = useContractRead({
        address: MinterAddress as string,
        abi: MinterAbi,
        functionName: 'getPrice',
    })

    const { config } = usePrepareContractWrite({
        address: MinterAddress as string,
        abi: MinterAbi,
        functionName: 'requestItem',
        overrides: {
            value: MintPrice as number,
        },
    })

    const { isLoading, isSuccess, write } = useContractWrite(config)

    useContractEvent({
        address: RandomAddress as string,
        abi: RandomAbi,
        eventName: 'Transfer',
        listener(from, to, tokenId) {
            if (from == ethers.constants.AddressZero && to == connectedAddress) {
                setTokenId(tokenId as string)
                setWaitingForNft(false)
                setNftReady(true)
            }
        },
    })
    const { data: tokenUri, isFetched } = useContractRead({
        address: RandomAddress as string,
        abi: RandomAbi,
        functionName: 'tokenURI',
        args: [tokenId],
    })

    useEffect(() => {
        if (MintPrice) {
            const formatedMintPrice = ethers.utils.formatEther(MintPrice as string)
            setMintPrice(formatedMintPrice)
        }
    }, [MintPrice])

    useEffect(() => {
        if (nftReady) {
            setJsonLink(tokenUri as string)
        }
    }, [nftReady, tokenUri])

    const handleWrite = async () => {
        write?.()
        setWaitingForNft(true)
    }

    return (
        <div className="h-screen flex justify-center items-center">
            {nftReady && isFetched && (
                <ImageModalNft
                    jsonLink={jsonLink}
                    tokenId={tokenId}
                    randomAddress={RandomAddress as string}
                />
            )}
            <div className="flex-grow h-screen flex justify-center items-center">
                <div className="max-w-4xl w-full sm:w-auto mx-auto bg-red-950 bg-opacity-70 h-min py-16 px-8 sm:px-24 flex flex-col">
                    <h2 className="text-white font-bold text-2l text-center mb-8">REQUEST NFT </h2>

                    <h3 className="text-white text-center mb-5">
                        {mintPrice !== null ? `Mint price: ${mintPrice}` : 'Loading...'}
                    </h3>
                    {isDisconnected && (
                        <h3 className="text-white text-center mb-5">Please, connect wallet</h3>
                    )}
                    {isLoading ? (
                        <Loader isLoading={true} text={'Waiting for transaction...'} />
                    ) : null}
                    {waitingForNft && isSuccess ? (
                        <Loader isLoading={true} text={'Waiting for minting...'} />
                    ) : null}
                    {!isDisconnected && (
                        <button
                            type="button"
                            onClick={handleWrite}
                            className="text-white bg-gradient-to-br from-red-700 to-black-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-400 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6 mb-2"
                        >
                            REQUEST
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
