import { useEffect, useState } from "react";

const useBuyer = email => {
    const [isBuyer, setIsBuyer] = useState(false);
    const [BuyerLoading, setBuyerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://car-zone-server.vercel.app/buyer?email=${email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setIsBuyer(data.isBuyer);
                    setBuyerLoading(false);
                })
        }
    }, [email])
    return [isBuyer, BuyerLoading];
}

export default useBuyer;