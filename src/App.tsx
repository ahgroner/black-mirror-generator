import * as React from 'react';
import phrases from './phrases';
import styled from 'styled-components';

const logo = require('./logo.jpg');
interface Props {
  className?: {};
}
interface Query {
  s?: number;
  a?: number;
  t?: number;
}

class App extends React.Component<Props> {
  state = {subjectID: 0, actionID: 0, twistID: 0};
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
          return {...o, [k]: v };
        },
        {});
    }
  }
  writeParams = (params: {}) => {
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
    this.setState({ subjectID, actionID, twistID });
    this.writeParams({s: subjectID, a: actionID, t: twistID });
  }
  componentDidMount() {
    const params = this.readParams();
    const {s, a, t} = params;
    if (s && a && t) {
      this.setState({ subjectID: s, actionID: a, twistID: t });      
    } else {
      this.generateNewPhrase();
    }
  }
  onClickRefresh = () => {
    this.generateNewPhrase();
  }
  render() {
    const {subjects, actions, twists} = phrases;
    const {className} = this.props;
    const {subjectID, actionID, twistID} = this.state;

    return (
      <div className={`App ${className}`}>
        <div className="title">
          <img src={logo} />
          <div className="subtitle"> episode generator </div>
        </div>
        <p className="synopsis">
          <span className="main-text">{`${subjects[subjectID]} ${actions[actionID]}`}</span>
          <span className="twist-text"> {twists[twistID]} </span>
        </p>
        <button
          className="refresh-button"
          onClick={this.onClickRefresh}
        >
          Refresh
        </button>
        <div className="footer">v0.1</div>
      </div>
    );
  }
}

export default styled(App)`
  background: black;
  color: white;
  text-align: center;
  font-family: Montserrat;
  min-height: 100vh;
  .title {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 200px; 
    overflow: hidden;
    img {
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
    font-size: 1.25rem;
    text-shadow: 0 0 1.5px rgba(216, 221, 231, 1);
  }
  .synopsis {
    line-height: 3.5rem;    
    font-size: 2rem;
    padding: 0 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: right;
    font-weight: 100;
    padding-right: 1rem;
  }
  .refresh-button {
    padding: .5rem 2rem;
    background: rgba(255,255,255, .2);
    border: 1px solid rgba(255,255,255, .2);
    color: white;
    font-size: 1rem;
    border-radius: 5px;
    margin: 2rem;
    cursor: pointer;
    opacity: .8;
    /* transition: all .2s linear; */
  }
  .refresh-button:hover {
    opacity: 1;
  }
  button:focus {outline:0;}
`;
