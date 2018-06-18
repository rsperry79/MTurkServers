
import * as React from 'react';
import { MultiPassageModel } from '../../models/MultiPassageModel';
import DisplayPassageN from '../DisplayPassageN';
import DisplayQuery from '../DisplayQuery';
export class DisplayDataView extends React.Component<MultiPassageModel, {}> {
    constructor(props: MultiPassageModel) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div>
               <DisplayQuery query={this.props.query} />
               <DisplayPassageN  passage={this.props.passageA} passageNumber={1} />
               <DisplayPassageN  passage={this.props.passageB} passageNumber={2} />
            </div>
        );
    }

}
