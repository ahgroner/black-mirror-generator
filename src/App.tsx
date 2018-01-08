import * as React from 'react';
import phrases from './phrases';
import styled from 'styled-components';
import Ad from './ad';
const logo = require('./logo.jpg');
const loading = require('./loading.gif');
const refresh = require('./refresh.png');

interface Props {
  className?: {};
}
interface State {
  subjectID?: number;
  actionID?: number;
  twistID?: number;
  showLoader?: boolean;
}

interface Query {
  s?: number;
  a?: number;
  t?: number;
}

class App extends React.Component<Props, State> {
  state = {
    subjectID: 0,
    actionID: 0,
    twistID: 0,
    showLoader: true
  };
  randomIntUpTo = (max: number) => Math.floor(Math.random() * (max + 1));

  readParams = (): Query => {
    const { search } = window.location;
    if (!search.length) {
      return {};
    } else {
      return search
        .substring(1)
        .split('&')
        .reduce(
        (o, kvString) => {
          const [k, v] = kvString.split('=');
          return { ...o, [k]: v };
        },
        {});
    }
  }
  writeParams = (params: {}) => {
    if (!Object.keys(params).length) {
      window.history.pushState('', 'Black mirror generator', '/');
      return;
    }
    const paramsToString =
      Object.keys(params)
        .map(k => `${k}=${params[k]}`)
        .join('&');
    window.history.pushState('', 'Black mirror generator', `/?${paramsToString}`);
  }

  generateNewPhrase = () => {
    const { subjects, actions, twists } = phrases;
    const subjectID = this.randomIntUpTo(subjects.length - 1);
    const actionID = this.randomIntUpTo(actions.length - 1);
    const twistID = this.randomIntUpTo(twists.length - 1);
    this.setState({ 
      subjectID, 
      actionID, 
      twistID,
      showLoader: true
    });
    // this.writeParams({
    //   s: subjectID,
    //   a: actionID,
    //   t: twistID,
    // });
  }
  componentDidMount() {
    const params = this.readParams();
    const { s, a, t } = params;
    if (s && a && t) {
      this.writeParams({});
      this.setState({
        subjectID: s,
        actionID: a,
        twistID: t,
        showLoader: true
      });
    } else {
      this.generateNewPhrase();
    }
  }
  onClickRefresh = () => {
    this.generateNewPhrase();
  }
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.showLoader) {
      setTimeout(
        () => { 
          this.setState({showLoader: false});
        }, 
        750
      );
    }

  }
  render() {
    const { subjects, actions, twists } = phrases;
    const { className } = this.props;
    const { subjectID, actionID, twistID, showLoader } = this.state;

    return (
      <div className={`App ${className}`}>
        <div 
          className="title"
          onClick={this.onClickRefresh}
        >
          <img className="logo" src={logo} />
          <div className="subtitle"> episode generator </div>
          <img 
            className="refresh-icon" 
            src={refresh} 
          />
        </div>
        {showLoader ? (
          <div className="synopsis">
            <img src={loading} />
          </div>
          ) : (
            <div className="synopsis">
              <span className="main-text">{`${subjects[subjectID]} ${actions[actionID]} ${twists[twistID]}`}</span>
              {/* <div 
                className="fb-share-button" 
                data-href="https://www.your-domain.com/your-page.html" 
                data-layout="button_count"
              /> */}
            </div>
          )}
        <div className="footer">
          <Ad />
        </div>
        <div className="disclaimer">
            This site is parody and not affiliated with Netfix or Black Mirror | v 1.0.0
          </div>
      </div>
    );
  }
}

const color = {
  screen_blue: 'rgba(216, 221, 231, 1)'
};

export default styled(App) `
  color: ${color.screen_blue};
  text-align: center;
  font-family: Montserrat;
  min-height: 100vh;
  .title {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 200px; 
    cursor: pointer;
    .logo {
      position: relative;
      top: 0;
    }
  }
  .subtitle {
    position: absolute;
    bottom: 30%;
    width: 100%;
    transform: rotate(-1.5deg);
    opacity: 7;
    text-shadow: 0px 1px purple;
    color: transparent;
    font-size: 20px;
    text-shadow: 0 0 1.5px rgba(216, 221, 231, 1);
  }
  .synopsis {
    line-height: 3.5rem;
    font-size: 2rem;
    padding: 0 2rem;
    max-width: 800px;
    margin: 0 auto;
    height: 20rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: right;
    font-weight: 100;
    padding-right: 1rem;
  }
  .disclaimer {
    padding: .5rem;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 10px;
    font-family: Montserrat-light;
    opacity: .5;
  }
  .refresh-icon {
    cursor: pointer;
    height: 4rem;
    opacity: .8;
    position: absolute;
    bottom: -1.5rem;
  }
  .refresh-icon:hover {
    /* transition: transform 50ms linear; */
    transform: scale(1.1) rotate(-5deg) ;
    opacity: 1;
  }
  button:focus {outline:0;}
`;
