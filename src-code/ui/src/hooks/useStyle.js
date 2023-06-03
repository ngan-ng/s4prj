import { useEffect } from 'react';
const useStyle = url => {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = url;
        link.rel = "stylesheet";
        link.type = "text/css";
        link.async = true;

        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        }
    }, [url]);
};

export default useStyle;
