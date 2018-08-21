import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { initialize } from '../../database/dux'
import Drawer from './components/drawer'

class Navigation extends React.PureComponent {
  componentWillMount() {
    this.props.actions.initialize()
  }

  render() {
    if (!this.props.isReady) {
      return null // TODO loading screen
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

const mapStateToProps = state => ({
  isReady: state.database.ready
})

const mapActionsToDispatch = dispatch => ({
  actions: bindActionCreators({ initialize }, dispatch)
})

export default connect(mapStateToProps, mapActionsToDispatch)(Navigation)
