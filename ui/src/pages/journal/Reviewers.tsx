import { ReviewersQuery, ReviewersQueryVariables } from 'types/gql'
import React from 'react'
import { Avatar } from 'antd'
import FontAwesome from 'react-fontawesome'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components'

const reviewersGql = graphql<ReviewersQuery, ReviewersQueryVariables>(gql`
  query Reviewers($id: ID) {
    journal(id: $id) {
      stageRules {
        canReview {
          journalRank
          beenionRank
          reviewers {
            user {
              id
            }
            invitation {
              service
              handle
              confirmed
            }
          }
        }
      }
    }
  }
`)

const Stage = styled.div`
  text-align: center;
`
const StageNum = styled.div`
  font-weight: bold
`

export default reviewersGql(({ data: { loading, journal, error } }) => {
  if (loading) return <div>Loading...</div>
  if (error) return <div>Unable to load reviewers. Please try again.</div>

  return (
    <div>
      {journal.stageRules.map((stageRule, i) => (
        <div key={i}>
          <StageNum>{i}</StageNum>
          <Stage>
            <div className="reviewers">
              {stageRule.canReview.reviewers &&
                stageRule.canReview.reviewers.map(({ user, invitation }) => (
                  <div key={user.id} className="reviewer">
                    <Avatar
                      size="large"
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                    <FontAwesome name="twitter" /> {invitation.handle}
                  </div>
                ))}
              {stageRule.canReview.journalRank ? (
                <div className="reviewer">
                  {stageRule.canReview.journalRank}
                </div>
              ) : null}
            </div>
          </Stage>
        </div>
      ))}
    </div>
  )
})
