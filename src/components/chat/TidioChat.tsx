import React, { useEffect } from 'react';

declare global {
  interface Window {
    tidioChatApi?: any;
  }
}

export default function TidioChat() {
  useEffect(() => {
    // Load Tidio script
    const script = document.createElement('script');
    script.src = "//code.tidio.co/9fddf7v5haobimg0jxr2dlfzazsproig.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
      if (window.tidioChatApi) {
        window.tidioChatApi.hide();
        window.tidioChatApi.close();
      }
    };
  }, []);

  return null;
}