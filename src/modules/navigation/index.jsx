import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { initialize } from '../../database/actions'
import Drawer from './components/drawer'
import LoadingIndicator from './components/loading'

class Navigation extends React.PureComponent {
  componentWillMount() {
    this.props.actions.initialize()
  }

  render() {
    if (!this.props.isReady) {
      return <LoadingIndicator />
    }

    return (
      <Router>
        <div className="window">
          <div className="window-content">
            <div className="pane-group">
              <Drawer />
              <div className="pane">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

Navigation.propTypes = {
  actions: PropTypes.shape({ initialize: PropTypes.func.isRequired }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isReady: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isReady: state.database.ready
})

const mapActionsToDispatch = dispatch => ({
  actions: bindActionCreators({ initialize }, dispatch)
})

export default connect(mapStateToProps, mapActionsToDispatch)(Navigation)
