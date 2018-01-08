import * as React from 'react';
import styled from 'styled-components';

class Ad extends React.Component<any> {
  componentDidMount() {
    (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
  }

  render() {
    return (
      <div className={`ad ${this.props.className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block'}}
          data-ad-client="ca-pub-8427771144228576"
          data-ad-slot="6830843337"
          data-ad-format="auto"
        />
      </div>
    );
  }
}
export default styled(Ad)`
    max-width: 800px;
    width: 100%;
    height: 50px;
    margin: auto;
`;