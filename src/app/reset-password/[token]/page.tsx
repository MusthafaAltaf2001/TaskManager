import ResetPassword from '@/components/pages/ResetPassword/ResetPassword'
import React from 'react'

const page = ({ params }: { params: string }) => {
    console.log(params)
    return (
        <ResetPassword token={params?.token} />
    )
}

export default page