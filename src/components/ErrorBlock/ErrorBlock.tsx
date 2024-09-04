import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';

const ErrorBlock = () => (
    <div className="flex w-full h-screen items-center justify-center">
        <h1 className="font-mono text-2xl font-extrabold text-neutral-300 flex items-center">
            Ooops! There has been an error 
            <ErrorIcon className="pl-4" fontSize="large" color="error" />
        </h1>
    </div>
)

export default ErrorBlock;