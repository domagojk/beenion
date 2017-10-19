import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Menu, Icon } from 'antd'
import { Page } from 'layouts/Page'
import Header from './Header'
import Reviewers from './Reviewers'

type Sections = 'reviewers' | 'accepted'

type Props = {
  id: string
  section: Sections
}

type State = {
  selectedSection: Sections
}

class Journal extends Component<Props> {
  state: State = {
    selectedSection: 'reviewers'
  }

  changeSection = e => {
    this.setState({
      selectedSection: e.key
    })
  }

  render() {
    return (
      <Page>
        <div className="pageHeader">
          <Header id={this.props.id} />
        </div>
        <div className="pageContent">
          <Menu
            onClick={this.changeSection}
            selectedKeys={[this.state.selectedSection]}
            mode="horizontal"
          >
            <Menu.Item key="reviewers">
              <Icon type="reviewers" />Reviewers
            </Menu.Item>
            <Menu.Item key="font">
              <FontAwesome name="twitter" /> Info
            </Menu.Item>
            <Menu.Item key="app">
              <Icon type="appstore" />Navigation Two
            </Menu.Item>
          </Menu>
          {this.renderSection()}
        </div>
      </Page>
    )
  }

  renderSection() {
    switch (this.props.section) {
      case 'reviewers':
        return <Reviewers id={this.props.id} />
      case 'accepted':
        return <div>accepted</div>
    }
  }
}

export default Journal
