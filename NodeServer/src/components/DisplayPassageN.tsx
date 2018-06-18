import React from 'react';
interface IDisplayPassageNProps extends React.Props<IDisplayPassageNProps> {
    passage?: string;
    passageNumber?: number;
}

const DisplayPassageN: React.StatelessComponent<IDisplayPassageNProps> = (props) => {
    return (
        <div className='display-block'>
            <div className='col-lg-12 col-md-12 col-sm12'>
                <label id={'answerLabel' + props.passageNumber}>Answer {props.passageNumber}:</label>
            </div>
            <div id={'passage' + props.passageNumber} className='passage-text col-lg-8 col-md-12 col-sm12'>{props.passage}</div>
            <div className='col-lg-4 col-md-12 col-sm12' />
            <br />
        </div>
    );
};

DisplayPassageN.defaultProps = {
    passage: 'passage',
    passageNumber: 1,
};

export default DisplayPassageN;
