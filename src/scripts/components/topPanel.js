import React from 'react';
import LinesSentCounter from './linesSentCounter'

function TopPanel(props) {
    return (
            <div>
                <LinesSentCounter linesCleared={props.linesCleared}/>
            </div>
    );
}

export default TopPanel;
