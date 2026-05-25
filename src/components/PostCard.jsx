import Image from 'next/image';
import React from 'react';

const PostCard = ({ card }) => {
    console.log(card, 'card')
    return (
        <div>
            <Image
            width= {500}
            height={500}
            src={card.image}
            alt={card.text || ''}/>
        </div>
    );
};

export default PostCard;