import React from 'react';
import LoadingBar from 'react-top-loading-bar';

function NoInternetPage() {
  return (
    <>
          <LoadingBar
                    color="#ff0000" // Customize the color (e.g., red)
                    height={1.5}       // Customize the height (4 pixels)
                    progress={100} // Set progress based on loading state
                />
      <div style={{width: '100%', height: 'calc(100vh - 96px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <h1>No Internet Connection</h1>
          <p>Please check your network connection and try again.</p>
        
      </div>
    </>
    
  );
}

export default NoInternetPage;