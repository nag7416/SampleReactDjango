import { Helmet } from 'react-helmet';
import StudioNav from './studioComps/StudioNav';
import StudioSidebar from './studioComps/StudioSidebar';
import { useEffect } from 'react';

export default function StudioHome({ userInfo }){

    return (
        <>
            <Helmet>
                <title>Channel Dashboard - YouTube</title>
            </Helmet>
            <StudioNav userInfo={userInfo} />
            <div className='main'>
                <StudioSidebar userInfo={userInfo} />
                <div className="studioscroll">
                    <div className="inner">
                        <div className="line">
                            <h5>Channel Dashboard</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}