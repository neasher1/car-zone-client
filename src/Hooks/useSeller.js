import { useEffect, useState } from "react";

const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [sellerLoading, setSellerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://car-zone-server.vercel.app/seller?email=${email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setIsSeller(data.isSeller);
                    setSellerLoading(false);
                })
        }
    }, [email])
    return [isSeller, sellerLoading];
}

export default useSeller;