import React from 'react';

// Components
import TopHeader from "./Components/TopHeader/TopHeader";
import ProfileInfo from "./Components/Profile/Profile";

const Profile = ({HandleCloseContactProfile,chat}) => {
    
    return (
        <section id="profile" className='flex flex-col relative border border-[#e5e5e5] h-full overflow-hidden'>
            <TopHeader HandleCloseContactProfile={HandleCloseContactProfile} chat={chat}/>
            <ProfileInfo chat={chat} />
        </section>
    )
}

export default Profile;
