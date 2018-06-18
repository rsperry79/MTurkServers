
// tslint:disable-next-line:no-implicit-dependencies
import * as enzyme from 'enzyme';
import * as React from 'react';
import DisplayPassageN from '../DisplayPassageN';

it('renders the correct text in the passage',
    () => {
        const id: 1 = 1;
        const passage: enzyme.ShallowWrapper<any, any> = enzyme.shallow(<DisplayPassageN passage="The president is Nixon" passageNumber={id}/>);
        expect(passage.find('.passage-text').text()).toEqual('The president is Nixon');
    });

it('renders the correct text in the passage if no passage is given',
    () => {
        const id: 1 = 1;
        const passage: enzyme.ShallowWrapper<any, any> = enzyme.shallow(<DisplayPassageN passageNumber={id}/>);
        expect(passage.find('.passage-text').text()).toEqual('passage');
    });

it('renders the correct passageNumber',
    () => {
        const id: 2 = 2;
        const passage: enzyme.ShallowWrapper<any, any> = enzyme.shallow(<DisplayPassageN passage="The president is Nixon" passageNumber={id}/>);
        const divId: string = `#answerLabel${id}`;
        const expectedText: string = `Answer ${id}:`;
        expect(passage.find(divId).text()).toEqual(expectedText);
    });

it('renders the correct passageNumber if no passageNumber is given',
    () => {
        const passage: enzyme.ShallowWrapper<any, any> = enzyme.shallow(<DisplayPassageN/>);
        expect(passage.find('#answerLabel1').text()).toEqual('Answer 1:');
    });
