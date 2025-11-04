import { useEffect, useState } from 'react';

function useCurrencyInfo(baseCurrency) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!baseCurrency) return;

        setLoading(true);
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`)
            .then((res) => res.json())
            .then((res) => {
                setData(res[baseCurrency]);
            })
            .catch((err) => {
                console.error('Failed to fetch currency data:', err);
                setData({});
            })
            .finally(() => setLoading(false));
    }, [baseCurrency]);

    return { data, loading };
}

export default useCurrencyInfo;