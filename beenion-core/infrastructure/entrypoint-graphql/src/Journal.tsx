import FontAwesome from 'react-fontawesome'
import React from 'react'
import { Layout, Menu, Icon, Avatar } from 'antd'
import JournalReviewers from './JournalReviewers'
const { Header, Content, Footer } = Layout



/*
const AddArticle = (o) => {
  console.log(o)
  const mutate = o.mutate
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist()
      mutate({
        variables: { name: evt.target.value },
        refetchQueries: [ { query: articleListQuery }]
      })
      .then(() => {
        evt.target.value = ''
      })
    }
  }
  return (
    <input
      type='text'
      placeholder='New article'
      onKeyUp={handleKeyUp}
    />
  )
}

const addArticleMutation = gql`
  mutation addArticle($name: String!) {
    addArticle(name: $name) {
      id
      name
    }
  }
`
*/

class Journal extends React.Component {
  state = {
    current: 'home'
  }
  handleClick = e => {
    console.log('click ', e)
    this.setState({
      current: e.key
    })
  }
  render () {
    return (
      <Layout style={{ background: '#f0f2f5' }}>
        <Header style={{ background: '#fff', height: 80, marginBottom: 20 }} />
        <div style={{ paddingBottom: 20, marginLeft: '8%' }}>
          <h1>React journal</h1>
          <h3>some description</h3>
        </div>
        <Content
          style={{
            margin: '0 8%',
            padding: '24px',
            borderRadius: 4,
            background: '#fff',
            minHeight: 800
          }}
        >
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode='horizontal'
          >
            <Menu.Item key='home'>
              <Icon type='home' />Reviewers
            </Menu.Item>
            <Menu.Item key='font'>
              <FontAwesome name='twitter' /> Info
            </Menu.Item>
            <Menu.Item key='app'>
              <Icon type='appstore' />Navigation Two
            </Menu.Item>
          </Menu>
          <JournalReviewers id='1' />
          <div>
            <Avatar
              size='large'
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            />
            <FontAwesome name='twitter' /> invited
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
      /*<div className="journal">
      <Button type="primary">Button</Button>
      <div>{name}</div>
      <div>{description}</div>
      <div>
        subscribed: 10 sent submissions: 25 approved submissions: 0 rejected
        submissions: 2
      </div>
      {reviewersPerStage.map(stageRule => (
        <div className="stage">
          <div className="stage-num">{stageRule.stage}</div>
          <div className="reviewers">
            {stageRule.users &&
              stageRule.users.map(user => (
                <div className="reviewer">{user.name}</div>
              ))}
            {stageRule.journalRank ? (
              <div className="reviewer">{stageRule.journalRank}</div>
            ) : null}
          </div>
        </div>
      ))}
    </div>*/
    )
  }
}

export default Journal
