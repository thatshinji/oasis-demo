import React from 'react'

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ error })
  }

  tryAgain = () => {
    window.location.reload()
  }

  render() {
    let { error } = this.state
    if (error) {
      return (
        <div className="error-boundary-container">
          <div className="error-body">
            <p>加载失败</p>
            <button onClick={this.tryAgain}>刷新页面</button>
          </div>
        </div>
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
