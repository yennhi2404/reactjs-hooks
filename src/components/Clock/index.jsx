import React, {useState, useEffect} from 'react';
import useClock from '../../hooks/useClock';

function Clock() {
    const {timeString} = useClock();

    return (
        <p style={{fontSize: '42px'}}>
            {timeString}
        </p>
    );
}

export default Clock;