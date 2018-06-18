// tslint:disable-next-line:no-implicit-dependencies
import * as enzyme from 'enzyme';
import * as React from 'react';
import DisplayQuery from '../DisplayQuery';

it('renders the correct text when no  query is given',
    () => {
        const query: enzyme.ShallowWrapper<any, any> = enzyme.shallow(<DisplayQuery/>);
        expect(query.find('#query').text()).toEqual('query');
    });

it('renders the correct text when a query is given',
    () => {
        const query: enzyme.ShallowWrapper<any, any> = enzyme.shallow(<DisplayQuery query="Who is the president"/>);
        expect(query.find('#query').text()).toEqual('Who is the president');
    });
