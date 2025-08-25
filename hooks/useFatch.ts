import { useEffect, useState } from "react";


const useFatch = <T>(fatchFunction: () => Promise<T>, autoFatch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fatchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const results = await fatchFunction();
            setData(results);
            
        } catch (error) {
            setError(error instanceof Error ? error : new Error('An error occurred'));

        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if(autoFatch) fatchData(); 
    }, []);

    return { data, loading, error, refatch: fatchData, reset };
}

export default useFatch;