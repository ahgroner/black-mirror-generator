import * as React from 'react';
import phrases from './phrases';
import styled from 'styled-components';
const logo = require('./logo.jpg');
interface Props {
  className?: any;
}
class App extends React.Component<Props> {
  state = {subjectID: 0, actionID: 0, twistID: 0};
  randomIntUpTo = (max: number) => Math.floor(Math.random() * (max + 1));

  generateNewPhrase = () => {
    const { subjects, actions, twists } = phrases;
    const subjectID = this.randomIntUpTo(subjects.length - 1);
    const actionID = this.randomIntUpTo(actions.length - 1);
    const twistID = this.randomIntUpTo(twists.length - 1);
    this.setState({ subjectID, actionID, twistID });
  } 
  componentDidMount() {
    // TODO: read deep link
    this.generateNewPhrase();
  }
  render() {
    const {subjects, actions, twists} = phrases;
    const {className} = this.props;
    const {subjectID, actionID, twistID} = this.state;

    return (
      <div className={`App ${className}`}>
        <div className='title'>
          <img src={logo} />
          <div className='subtitle'> episode generator </div>
        </div>
        <p className="synopsis">
          {`${subjects[subjectID]} ${actions[actionID]}`}
          <div className="twist-text"> {twists[twistID]} </div>
        </p>
      </div>
    );
  }
}

export default styled(App)`
  background: black;
  color: white;
  text-align: center;
  font-family: Montserrat;
  .title {
    position: relative;
    img {
      width: 100%;
      max-width: 600px;
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
    font-size: 1.5rem;
    text-shadow: 0 0 1.5px rgba(216, 221, 231, 1);
  }
  .synopsis {
    line-height: 3.5rem;    
    font-size: 2rem;
    padding: 2rem;
    max-width: 1080px;
    margin: 0 auto;
  }
  .twist-text {

  }
`;
