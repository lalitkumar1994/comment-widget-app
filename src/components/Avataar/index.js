import React from 'react'
import { getInitialCharacter } from '../../utils'
const Avataar = ({ name, imgUrl = undefined, isProfile = false }) => {
    if (imgUrl) {
        return <img src={imgUrl} alt="avataar" />
    } else {
        return (
            <div className={isProfile ? 'avataar-profile' : 'avataar'}>
                <div>{getInitialCharacter(name)}</div>
            </div>

        )
    }
}

export default Avataar
