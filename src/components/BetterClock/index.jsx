import React, {useState, useEffect} from 'react';
import useClock from '../../hooks/useClock';
import './BetterClock.css';

function BetterClock() {
    const {timeString} = useClock();

    return (
        <div class="better-clock">
            <p className="better-clock__time">{timeString}</p>
        </div>
    );
}

export default BetterClock;