import React from 'react';

function TimeRemaining(props) {
    let secondsRemaining = props.timeRemaining;

    return (
        <div className="timeRemaining">
            {secondsRemaining}
        </div>
    );
}

export default TimeRemaining;
