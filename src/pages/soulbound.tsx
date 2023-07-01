import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material'
import RegistryAbi from '../constants/RegistryAbi.json'
import SoulboundsAbi from '../constants/SoulboundsAbi.json'
import Loader from '../components/Loader'
import ImageModalSbt from '../components/ImageModalSbt'

import {
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useAccount,
    useContractEvent,
    useSignMessage,
} from 'wagmi'

import { ethers } from 'ethers'

const registryAddress = '0x0cdC919cE4e4342Fdf5BEAA122a88982Fe8c921d'

export default function Soulbound() {
    const [signature, setSignature] = useState('')
    const [jsonLink, setJsonLink] = useState('')
    const [sbtReady, setSbtReady] = useState(false)
    const [waitingForSbt, setWaitingForSbt] = useState(false)
    const tokenId = '2'

    const { address: connectedAddress, isDisconnected } = useAccount()

    const { data: SoulboundsAddress } = useContractRead({
        address: registryAddress,
        abi: RegistryAbi,
        functionName: 'getSoulboundsAddress',
    })

    const { config } = usePrepareContractWrite({
        address: SoulboundsAddress as string,
        abi: SoulboundsAbi,
        functionName: 'superAchievement',
        args: [connectedAddress, signature],
    })

    const { isLoading, isSuccess, write } = useContractWrite(config)

    useContractEvent({
        address: SoulboundsAddress as string,
        abi: SoulboundsAbi,
        eventName: 'SuperAchievementMinted',
        listener(to) {
            if (to == connectedAddress) {
                setWaitingForSbt(false)
                setSbtReady(true)
            }
        },
    })
    const { data: tokenUri, isFetched } = useContractRead({
        address: SoulboundsAddress as string,
        abi: SoulboundsAbi,
        functionName: 'uri',
        args: [tokenId],
    })

    useEffect(() => {
        if (sbtReady) {
            setJsonLink(tokenUri as string)
        }
    }, [sbtReady, tokenUri])

    const handleWrite = async () => {
        write?.()
        setWaitingForSbt(true)
    }

    return (
        <div className="h-screen flex justify-center items-center">
            {sbtReady && isFetched && (
                <ImageModalSbt
                    jsonLink={jsonLink}
                    tokenId={tokenId}
                    soulboundsAddress={SoulboundsAddress as string}
                />
            )}
            <div className="max-w-4xl mx-auto bg-red-950 bg-opacity-60 h-min py-12 px-4 sm:px-24 flex flex-col">
                <h2 className="text-white font-bold text-2l text-center mb-8">GET SECRET SBT</h2>
                <TextField
                    label="Signature"
                    variant="outlined"
                    color="error"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    inputProps={{
                        style: { color: 'white' },
                        classes: { notchedOutline: 'text-white' },
                    }}
                    focused
                />
                {isDisconnected && (
                    <h3 className="text-white text-center mt-5 mb-5">Please, connect wallet</h3>
                )}

                {!isDisconnected && (
                    <Button
                        sx={{ mt: 4, bgcolor: (theme) => theme.palette.common.black }}
                        className="font-bold text-white bg-black mt-4 self-center px-8 py-4 disabled:opacity-75"
                        disabled={isLoading}
                        onClick={handleWrite}
                        variant="contained"
                        color="error"
                    >
                        SUPER SBT
                    </Button>
                )}
                {isLoading || (waitingForSbt && isSuccess) ? (
                    <Loader isLoading={true} text={'Waiting for transaction...'} />
                ) : null}
            </div>
        </div>
    )
}
