import axios from 'axios';
import React from 'react';
import PostCard from './PostCard';

const HomeDataCardShow = async () => {
    const res = await axios.get(`${process.env.API_URL}/uploads`);
    const data = res.data;
    console.log(data, 'res')

    return (
        <div className='w-11/12 mx-auto space-x-2 space-y-2 mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5'>
            {
                data.map(card => <PostCard key={card._id} card={card} />)
            }
        </div>
    );
};

export default HomeDataCardShow;