import {useRouter} from 'next/router'

const Success = () => {

    const router = useRouter();
    if(router.query.redirect_status === "succeeded") {
        if(typeof window !== 'undefined') {
            try {
                const local = localStorage?.removeItem("persist:cart").cart
                router.reload()
            }
            catch(err) {
                console.log(err)
            }
        }   
    }

    return (
        <div>
            <h1>
                success
            </h1>
        </div>
    )
}

export default Success
