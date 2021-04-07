import React from 'react'
import {useRouteMatch} from 'react-router-dom'

export default function ManageAds() {
    const {url} = useRouteMatch()
    console.log(url);
    return (
        <div>
            manage ads
        </div>
    )
}
