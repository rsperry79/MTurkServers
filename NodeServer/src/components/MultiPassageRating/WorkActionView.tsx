import * as React from 'react';
import { MultiPassageModel } from '../../models/MultiPassageModel';

interface IState {
    selectedOption: any;
    answerOptions: string[];
    Comments: string;
}

export class WorkActionView extends React.Component<MultiPassageModel, IState> {

    constructor(props: MultiPassageModel) {
        super(props);

        this.state = {
            selectedOption: window.Model.Rating,
            // tslint:disable-next-line:object-literal-sort-keys
            answerOptions: [
                'yes',
                'no',
                'dont know',
            ],
            Comments: '',
        };

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div id={'workActionItem' + this.props.id}>
                {this.LoadRating()}
            </div>
        );
    }

    private handleOptionChange(changeEvent: any): void {
        const { UpdateRating } = this.props;
        this.setState({ selectedOption: changeEvent.target.id });

        if (changeEvent.currentTarget.id === '2') {
            UpdateRating(2);
        }
        if (changeEvent.currentTarget.id === '1') {
            UpdateRating(1);
        }
        if (changeEvent.currentTarget.id === '0') {
            UpdateRating(0);
        }
    }

    private updateInputValue(evt: any) {
        const { UpdateComment } = this.props;
        const comment = String(evt.target.value);
        this.setState({ Comments: comment });
        UpdateComment(comment);
    }

    private LoadRating(): JSX.Element {

        return (

            <div className='display-block'>

                <div className='col-lg-12'>
                    <br />
                    <label>Are both passages correct?</label>
                    <br />
                </div>

                <div className='col-lg-12 radioPad'>
                    <form>

                        <div className='row '>
                            <div className='col-lg-3'>
                                <label className={window.Model.Rating === 2 ? 'radioPad_wrapper_good radioPad__wrapper_sel_good' : 'radioPad_wrapper_good'} >
                                    <input className='radioPad__radio' type='radio' name='GivenAnswer' id='2' value={this.state.answerOptions[2]} onChange={this.handleOptionChange} onClick={this.handleOptionChange} />
                                    {this.state.answerOptions[2]}
                                </label>
                            </div>
                            <span className='explanation-text'>
                            yes.
                            </span>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <label className={window.Model.Rating === 1 ? 'radioPad_wrapper_bad radioPad__wrapper_sel_bad' : 'radioPad_wrapper_bad'} >
                                    <input className='radioPad__radio' type='radio' name='GivenAnswer' id='1' value={this.state.answerOptions[1]} onChange={this.handleOptionChange} onClick={this.handleOptionChange} />
                                    {this.state.answerOptions[1]}
                                </label>
                            </div>
                            <span className='explanation-text'>
                             no
                            </span>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <label className={window.Model.Rating === 0 ? 'radioPad_wrapper_dup radioPad__wrapper_sel_dup' : 'radioPad_wrapper_dup'} >
                                    <input className='radioPad__radio' type='radio' name='GivenAnswer' id='0' value={this.state.answerOptions[0]} onChange={this.handleOptionChange} onClick={this.handleOptionChange} />
                                    {this.state.answerOptions[0]}
                                </label>
                            </div>
                            <span className='explanation-text'>
                             I don't know
                            </span>
                        </div>
                    </form>
                </div>
                <br />
                <br />
                <div>
                    <div className='row' >
                        <div className='col-lg-12' >
                            <label>Comments for this problem:</label>
                            <input id={'comment' + this.props.id} name='comment' className='form-control' type='text' spellCheck={true} value={window.Model.Comment} onChange={this.updateInputValue} />
                        </div>
                    </div>
                </div>
                <br />
            </div>

        );
    }
}
