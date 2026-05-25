import axios from 'axios';
import React from 'react';
import PostCard from './PostCard';

const HomeDataCardShow = async () => {
    const res = await axios.get(`${process.env.API_URL}/uploads`);
    const data = res.data;
    console.log(data, 'res')

    return (
        <div>
            {
                data.map(card => <PostCard key={card._id} card={card} />)
            }
        </div>
    );
};

export default HomeDataCardShow;