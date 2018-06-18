import React from 'react';
interface ISubmit {
    SubmitUrl: string;
    AssignmentId: string;
    Submit: any;
}

const Submit: React.StatelessComponent<ISubmit> = (props: ISubmit) => {

    return (
        <div>
            <div id='CommentBlock' className='comment-block'>
                <div className='col-lg-12 col-md-12 col-sm12'>
                    <form id='mturk_form' method='post' action={props.SubmitUrl + 'externalSubmit'}>
                        <input type='hidden' name='user_id' id='user_id' />
                        <input type='hidden' name='assignmentId' defaultValue={props.AssignmentId} />
                        <button className='btn btn-success' type='submit' value='Submit'  onClick={(event: any) => { props.Submit(); }}> Finish and Submit HIT </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Submit;
