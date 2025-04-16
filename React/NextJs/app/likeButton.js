'use client'

import { useState } from 'react';

export default function LikeButton() {
    const [likes, setLikes] = useState(0);

    function click() {
        setLikes(likes+1);
    }

    return <input type="button" value={"Likes: " + likes} onClick={click}/>;
}