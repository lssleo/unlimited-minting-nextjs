import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'

interface Props {
    jsonLink: string
    tokenId: string
    soulboundsAddress: string
}

const useStyles = makeStyles({
    modalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#8c0000',
        border: 'none',
        outline: 'none',
        borderRadius: '11px',
        padding: '24px',
        textAlign: 'center',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '34px',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '400px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
})

const ImageModalSbt: React.FC<Props> = ({ jsonLink, tokenId, soulboundsAddress }) => {
    const [open, setOpen] = useState(true)
    const [imageUrl, setImageUrl] = useState('')
    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(jsonLink)
            const data = await response.json()
            setImageUrl(data.image_url)
        }

        fetchData()
    }, [jsonLink])

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modalContainer}
            >
                <Box
                    className={classes.modalContent}
                    bg-black
                >
                    <div className={classes.imageContainer}>
                        <img
                            src={imageUrl}
                            alt={`Token ${tokenId}`}
                            className={classes.image}
                        />
                    </div>
                    <div className="mb-8">
                        <a
                            href={`https://testnets.opensea.io/assets/mumbai/${soulboundsAddress}/${tokenId}`}
                            target="_blank"
                        >
                            <Button
                                variant="outlined"
                                color="info"
                            >
                                Open at OpenSea
                            </Button>
                        </a>
                    </div>
                    <div className="font-bold text-white text-1xl text-center mb-8">WOW!!!YOU GET SUPER SECRET ACHIEVEMENT! 🎉🎉🎉</div>
                </Box>
            </Modal>
        </>
    )
}

export default ImageModalSbt
