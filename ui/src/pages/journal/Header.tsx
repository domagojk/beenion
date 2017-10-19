import { JournalHeaderQuery, JournalHeaderQueryVariables } from 'types/gql'
import React from 'react'
import { gql, graphql } from 'react-apollo'

const headerGql = graphql<JournalHeaderQuery, JournalHeaderQueryVariables>(gql`
  query JournalHeader($id: ID) {
    journal(id: $id) {
      name
    }
  }
`)

export default headerGql(({ data }) => {
  if (data.loading || data.error) return null

  return (
    <div>
      <h1>{data.journal.name}</h1>
      <h3>some description</h3>
    </div>
  )
})
