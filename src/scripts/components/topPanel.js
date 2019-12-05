import React from 'react';
import TimeRemaining from './timeRemaining'
import LinesSentCounter from './linesSentCounter'

function TopPanel(props) {
    return (
            <div>
                <TimeRemaining />
                <LinesSentCounter />
            </div>
    );
}

export default TopPanel;
