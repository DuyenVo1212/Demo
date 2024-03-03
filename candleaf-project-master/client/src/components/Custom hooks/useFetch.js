import {useEffect, useState} from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData(url);

    }, [url])

    const fetchData = async(url) => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const dataResponse = await response.json()
            setData(dataResponse)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return [data, loading]
}
