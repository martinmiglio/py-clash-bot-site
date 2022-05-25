import React, {Component} from 'react';
import {releaseLinkEvent} from '../../GoogleAnalytics';


const apiUrl = 'https://api.github.com/repos/matthewmiglio/py-clash-bot/releases/latest';


/**
* Component for latest release download link
*/
export default class ReleaseLink extends Component {
  /**
   * constructor to set states
   * @param {*} props component props
   */
  constructor(props) {
    super(props);
    this.state = {
      release_url: [],
    };
  }
  /**
   * make api call to get download count on release
   */
  getLatestReleaseInfo() {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.setState({release_url: data.assets[0].browser_download_url});
          let downloadCount = 0;
          for (const asset in data.assets) {
            if (Object.prototype.hasOwnProperty.call(data, assets)) {
              downloadCount = downloadCount + asset.download_count;
            }
          }
          this.setState({download_count: downloadCount});
          this.setState({last_updated: data.assets[0].updated_at});
        });
  }
  /**
   * on mount get release info
   */
  componentDidMount() {
    this.getLatestReleaseInfo();
  }
  /**
   * react render override
   * @return {JSX.Element}
   */
  render() {
    return (
      <p><a
        className='download'
        href={this.state.release_url}
        onClick={() => releaseLinkEvent()}
      >
                Download the latest release
      </a></p>
    );
  }
}
