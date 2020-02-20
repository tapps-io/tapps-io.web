import { useEffect } from 'react';

const useStyle = (...urls: string[]) => {
  useEffect(() => {
    const links = urls.map(url => {
      const link = document.createElement('link');
      link.href = url;
      document.head.appendChild(link);
      return link;
    });
    return () => {
      //links.forEach(link => document.body.removeChild(link));
    };
  }, [urls]);
};

export default useStyle;
