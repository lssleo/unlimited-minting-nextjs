import React from 'react'

interface Props {
    isLoading: boolean
    text?: string
}

const Loader: React.FC<Props> = ({ isLoading, text }) => {
    return (
        <>
            {isLoading && (
                <div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                    style={{ backgroundColor: 'rgba(82, 0, 0, 1)' }}
                >
                    <span className="mb-9 text-2xl text-white">{text}</span>
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
                </div>
            )}
        </>
    )
}

export default Loader
