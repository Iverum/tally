import React from 'react'

class LoadingIndicator extends React.PureComponent {
  render() {
    return (
      <div className="window">
        <div
          className="window-content"
          style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}
        >
          Loading…
        </div>
      </div>
    )
  }
}

export default LoadingIndicator
