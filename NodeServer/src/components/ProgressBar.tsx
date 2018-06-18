import React from 'react';
interface IProgressBar {
    max?: number;
    value: number;
    width: string;
}

const ProgressBar: React.StatelessComponent<IProgressBar> = (props: IProgressBar) => {

    return (
        <div className='col-lg-10' >
            <div className='progress'  >
                <div id='progress' className='progress-bar progress-bar-success' role='progressbar' aria-valuenow={props.value} aria-valuemin={0} aria-valuemax={props.max} style={{width: props.width}}>
                    {props.value}%</div>
            </div>
        </div>
    );
};

ProgressBar.defaultProps = {
    max: 100,
    value: 0,
};

export default ProgressBar;
