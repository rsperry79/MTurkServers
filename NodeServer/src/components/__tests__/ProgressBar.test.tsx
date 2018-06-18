
// tslint:disable-next-line:no-implicit-dependencies
import * as enzyme from 'enzyme';
import * as React from 'react';
import ProgressBar from '../ProgressBar';

it('renders the correct text in the progressbar',
    () => {
        const value: 50 = 50;
        const max: 100 = 100;
        const width: '80%' = '80%';
        const expected: '50%' = '50%';
        const progressBar: enzyme.ShallowWrapper<any, any> = enzyme.shallow(<ProgressBar value={value} max={max} width={width}/>);
        expect(progressBar.find('#progress').text()).toEqual(expected);
    });

it('renders the correct text in the progressbar if no max is given',
    () => {
        const value: 70 = 70;
        const expected: '70%' = '70%';
        const width: '80%' = '80%';
        const progressBar: enzyme.ShallowWrapper<any, any> = enzyme.shallow(<ProgressBar value={value} width={width}/>);
        expect(progressBar.find('#progress').text()).toEqual(expected);
    });

// it('renders the correct value  in the property ', () => {
//   const value = 70;
//   const expected = '70%';
//   const progressBar = enzyme.shallow(<ProgressBar  value={value} />);
//   expect(progressBar.find('#progress').text()).toEqual(expected);
// });
