import React, { Component } from 'react'
import { Layout } from 'antd'
import './page.css'
const { Header, Footer } = Layout

export class Page extends Component {
  render() {
    return (
      <Layout style={{ background: '#f0f2f5' }}>
        <Header style={{ background: '#fff', height: 80, marginBottom: 20 }} />
        {this.props.children}
        <Footer style={{ textAlign: 'center' }}>Beenion</Footer>
      </Layout>
    )
  }
}
