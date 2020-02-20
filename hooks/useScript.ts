import { useEffect } from 'react';

const useScript = (...urls: string[]) => {
  useEffect(() => {
    const scripts = urls.map(url => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
      return script;
    });
    return () => {
      //scripts.forEach(script => document.body.removeChild(script));
    };
  }, [urls]);
};

export default useScript;
