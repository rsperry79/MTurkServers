// import queryString from 'query-string';
import queryString from 'query-string';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { EnthusiasmAction } from './actions';
import { MultiPassageRating } from './components/MultiPassageRating/Index';
// import { SpokenQuery } from './components/SpokenQuery/Index';
import Hello from './containers/Hello';
import { enthusiasm } from './reducers/index';

export default class Main extends React.Component {
  private pathName: string = location.pathname.substr(1);
  private parsed = queryString.parse(location.search);

  private store = createStore<IStoreState,
    EnthusiasmAction,
    any,
    any>(enthusiasm, {
      enthusiasmLevel: 1,
      languageName: 'TypeScript',
    });

  private request: IMturkRequest = {
    AssignmentId: this.parsed.assignmentId,
    HitId: this.parsed.hitId,
    PathName: this.pathName,
    RecordId: this.parsed.RecordId,
    TurkSubmitTo: this.parsed.turkSubmitTo,
    WorkerId: this.parsed.workerId,
  };

  public render() {
    return (
      <Provider store={this.store}>
        <Router>
          <div>
            <Switch>
              <Route exact={true} path='/' component={Hello} />
              <Route path='/MultiPassage' render={() => <MultiPassageRating {...this.request} />} />
            </Switch>
          </div>
        </Router>
      </Provider >
    );
  }
}

ReactDOM.render(
  <Main />, document.getElementById('main') as HTMLElement);
