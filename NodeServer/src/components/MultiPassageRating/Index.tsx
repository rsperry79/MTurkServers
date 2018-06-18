import axios from 'axios';
import $ from 'jquery';
import React from 'react';
import { MultiPassageModel } from '../../models/MultiPassageModel';
import '../../scss/MultiPassage.scss'; // load the css
import HitappComments from '../HitappComments';
import { DisplayDataView } from '../MultiPassageRating/DisplayDataView';
import { WorkActionView } from '../MultiPassageRating/WorkActionView';
import ProgressBar from '../ProgressBar';
import Submit from '../Submit';

window.jQuery = $;
window.$ = $;

export class MultiPassageRating extends React.Component<IMturkRequest, IMultiPassageState>  {
    constructor(props: IMturkRequest) {
        super(props);

        this.state = {
            Request: this.props,
            currentIndex: 0,
            model: new MultiPassageModel(),
            percentage: 0,
            showButton: true,
            showSubmit: false,
            showWork: true,
            time: new Date(),
            width: '0%',
        };

        // state caused an error on binding
        window.Model = this.state.model;
        window.MTurkRequest = this.props;

        // load the events for the work action view
        window.Model.UpdateComment = this.UpdateComment;
        window.Model.UpdateRating = this.UpdateRating;

        // set up UX and AI
        this.instructions();

        $((document) as any).ready(() => {
            if (!this.state.Request.RecordId) { return; }
            window.Model.Index = 0;
            this.setState({ model: window.Model });
            if (!window.HitData) {
                window.HitData = new Array();
            }

            // Hide submit button
            $('#submitButton').hide();
            // disable the next button
            $('#NextButton').prop('disabled', true);
        });

        this.NextItem = this.NextItem.bind(this);
    }

    public NextItem(): void {
        try {
            if (window.HitData.length >= window.Model.Index) {
                // if there are no left remove the next button and then add the submit button
                if ((window.HitData.length - window.Model.Index) === 1) {
                    this.setState({ showWork: false });
                    this.setState({ showSubmit: true });
                    $('#submitButton').show();
                    $('#submitButton').prop('disabled', false);
                }
                // seconds elapsed on item
                const now = new Date();
                window.Model.Time = (now.getTime() - this.state.time.getTime()) / 1000;
                this.setState({ time: now });
                // make it display the new item
                window.Model.Index = window.Model.Index + 1;
                this.setState({ model: window.Model });
                // update the progress bar
                this.setState({ percentage: (window.Model.Index / window.HitData.length) * 100 });
                this.setState({ width: (window.Model.Index / window.HitData.length) * 100 + '%' });

                // disable the next button
                $('#NextButton').prop('disabled', true);
                window.Model.Rating = -1;
            }
        } catch (error) {
            // Todo : appInsights
        }
    }

    public UpdateRating(modifiedValue: number) {
        const temp = window.Model;
        temp.Rating = modifiedValue;
        window.Model = temp;
        $('#NextButton').prop('disabled', false);
    }

    public UpdateComment(modifiedValue: string) {
        const temp = window.Model;
        temp.Comment = modifiedValue;
        window.Model = temp;
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.state.showWork ? <DisplayDataView {...this.state.model} /> : null}
                {this.state.showWork ? <WorkActionView {...this.state.model} /> : null}
                {this.state.showWork ?
                    <div className='row' >
                        <div className=' row col-lg-2' >
                            <button id='NextButton' type='button' className='btn btn-block btn-primary next-button' onClick={this.NextItem} >
                                Next
                            </button>
                        </div>
                        <div className='col-sm-12'><br /></div>
                        <ProgressBar value={this.state.percentage} width={this.state.width} />
                    </div> : null}
                {this.state.showSubmit ? <HitappComments /> : null}
                {this.state.showSubmit ? <Submit SubmitUrl={this.props.TurkSubmitTo} AssignmentId={this.props.AssignmentId} Submit={this.RecordData}/> : null}
            </div>
        );
    }

    public componentDidMount() {
        const datasouce: string = `https://vesaliusdata.azurewebsites.net/api/Hit/${this.state.Request.RecordId}`;

        axios.get(datasouce)
            .then((hitItems) => {
                // tslint:disable-next-line:prefer-for-of
                for (let index = 0; index < hitItems.data.length; index++) {
                    const current = hitItems.data[index];
                    const hitItemData: IMultiPassageDtoHitItem = JSON.parse(current.hitItemData);
                    const temp: IMultiPassageHitItem = {
                        Comment: '',
                        HitItemId: current.hitItemId,
                        Rating: -99,
                        Time: 0,
                        id: hitItemData[0].Value,
                        passageA: hitItemData[2].Value,
                        passageB: hitItemData[3].Value,
                        query: hitItemData[1].Value,
                    };
                    if (window.HitData) {
                        window.HitData.push(temp);
                    }
                }
                window.Model.Index = 0;
                this.setState({ model: window.Model });
            });
    }

    private RecordData() {
        const datasource: string = 'https://vesaliusdata.azurewebsites.net/api/results';

        const temp: hitResHitResultDto = {
            ResultItems: new Array(),
            RecordId: window.MTurkRequest.RecordId,
            WorkerId: window.MTurkRequest.WorkerId,
            ExternalAssignmentId: window.MTurkRequest.AssignmentId,
            HitAppComments: window.HitAppComment,
            SubmitTime: new Date(),
        };

        window.HitData.forEach((element: IMultiPassage) => {
            const array = new Array();
            const rating: IRecord = {
                Name: 'Rating',
                Value: element.Rating.toString(),
            };

            array.push(rating);
            const resultItem: resultItemDto = {
                ResultItemData: JSON.stringify(array),
                TimeToCompleteItemInSeconds: element.Time,
                Comment: element.Comment,
            };

            temp.ResultItems.push(resultItem);

        });

        axios.post(datasource, temp)
            .then((response) => { console.log(response); });
    }

    private instructions() {
        // instructions expand/collapse
        const content: any = $('#instructionBody');
        const trigger: any = $('#collapseTrigger');
        content.hide();
        $('.collapse-text').text('(Click to expand)');
        trigger.click(() => {
            content.toggle();
            const isVisible: any = content.is(':visible');
            if (isVisible) {
                $('.collapse-text').text('(Click to collapse)');
            } else {
                $('.collapse-text').text('(Click to expand)');
            }
        });
    }
}
