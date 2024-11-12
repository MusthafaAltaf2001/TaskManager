import React from 'react'
import ResetPassword from '@/components/pages/ResetPassword/ResetPassword'

const page = ({ params }: { params: { token: string } }) => {

    if (!params.token) {
        return
    }

    return (
        <ResetPassword token={params.token} />
    )
}

export default page