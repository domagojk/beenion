import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Menu, Icon } from 'antd'
import { Page } from '../../layouts/Page'

export class Journal extends Component {
  state = {
    selectedSection: 'reviewers'
  }

  changeSection = e => {
    this.setState({
      selectedSection: e.key
    })
  }

  render () {
    return (
      <Page>
        <div className='pageHeader'>
          <div>
            <h1>aaa</h1>
            <h3>some descrisption</h3>
          </div>
        </div>
        <div className='pageContent'>
          <Menu
            onClick={this.changeSection}
            selectedKeys={[this.state.selectedSection]}
            mode='horizontal'
          >
            <Menu.Item key='reviewers'>
              <Icon type='reviewers' />Reviewers
            </Menu.Item>
            <Menu.Item key='font'>
              <FontAwesome name='twitter' /> Info
            </Menu.Item>
            <Menu.Item key='app'>
              <Icon type='appstore' />Navigation Two
            </Menu.Item>
          </Menu>
          <div>reviewers</div>
        </div>
      </Page>
    )
  }
}
