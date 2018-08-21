import React from 'react'

const CancelButton = ({ onClick }) => (
  <button
    className="btn btn-form btn-default"
    onClick={onClick}
  >
    Cancel
  </button>
)

class NewMedia extends React.PureComponent {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div>
        <h3>Add New Media</h3>
        <div className="form-group">
          <img src={undefined} />
          <button className="btn btn-default">Select File</button>
        </div>
        <div className="form-group">
          <label>Source</label>
          <input
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Tags</label>
          <input
            className="form-control"
            type="text"
          />
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" /> NSFW
          </label>
        </div>
        <div className="form-actions">
          <CancelButton onClick={this.goBack} />
          <button type="submit" className="btn btn-form btn-primary">OK</button>
        </div>
      </div>
    )
  }
}

export default NewMedia
