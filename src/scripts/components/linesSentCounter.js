import React from 'react';

function LinesSentCounter(props) {
    return (
        <div>
            {"Lines Sent: " + props.linesCleared}
        </div>
    )
}

export default LinesSentCounter;
