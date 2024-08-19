import React, { useEffect } from 'react';

const AddComponent = () => {
  useEffect(() => {
    // Check if the script is already added to the document
    const scriptId = 'adsterra-script';
    if (!document.getElementById(scriptId)) {
      // Create a new script element
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = '//pl24058579.highratecpm.com/c898e8e2f87310227ccbfb5d154642f3/invoke.js';

      // Append the script to the body
      document.body.appendChild(script);
    }

    // Clean up function (optional)
    return () => {
      const adContainer = document.getElementById('container-c898e8e2f87310227ccbfb5d154642f3');
      if (adContainer) {
        adContainer.innerHTML = ''; // Remove ad content if component unmounts
      }
    };
  }, []);

  return <div id="container-c898e8e2f87310227ccbfb5d154642f3"></div>;
};

export default AddComponent;