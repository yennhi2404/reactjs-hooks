import React, {useState} from 'react';
import './ColorBox.css';

function getRandomColor(){
    const COLOR_LIST = ['deepink','green','yellow','black','blue'];
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}

function ColorBox() {
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box_color') || 'ink';
        return initColor;
    });

    function handleColorBox(){
        // get random color -> set color
        const newColor = getRandomColor();
        setColor(newColor);

        localStorage.setItem('box_color', newColor);
    }
    return (
        <div className="color-box" style={{ backgroundColor: color }}
              onClick={handleColorBox} >
            COLOR BOX
        </div>
    );
}

export default ColorBox;