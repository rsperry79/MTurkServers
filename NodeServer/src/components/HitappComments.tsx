import React from 'react';

interface IHitAppCommentProps extends React.Props<IHitAppCommentProps> {
    Label?: string;
    Query?: string;
    OnChange?: any;
}

const HitappComments: React.StatelessComponent<IHitAppCommentProps> = (props: IHitAppCommentProps) => {
    return (
        <div id='CommentBlock' className='comment-block row'>
        <div className='col-lg-12 col-md-12 col-sm12'>
            <label>Comments on the hit itself (optional):</label>
            <input id='HitappComments' name='HitappComments' className='form-control' type='text' spellCheck={true} placeholder='Enter comments if needed.' onChange={props.OnChange(event)}/>
        </div>
    </div>
    );
};

HitappComments.defaultProps = {
    Label: 'Question to be answered:',
    Query: 'query',
    OnChange: (event: any) => {

        if (window.HitAppComment === undefined) {
            window.HitAppComment = '';
        }
        window.HitAppComment =   String(event.target.value);
    },
};

export default HitappComments;
