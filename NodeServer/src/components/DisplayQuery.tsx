import React from 'react';

interface IDisplayQueryProps extends React.Props<IDisplayQueryProps> {
    label?: string;
    query?: string;
}

const DisplayQuery: React.StatelessComponent<IDisplayQueryProps> = (props: IDisplayQueryProps) => {
    return (
        <div id='question' className='display-block'>
            <div className='col-lg-12 col-md-12 col-sm12'> <label>{props.label}</label> </div>
            <div id='query' className='query-text  col-lg-8 col-md-12 col-sm12'>{props.query}</div>
            <div className='col-lg-4 col-md-12 col-sm12' />
            <br />
        </div>
    );
};

DisplayQuery.defaultProps = {
    label: 'Question to be answered:',
    query: 'query' };

export default DisplayQuery;
