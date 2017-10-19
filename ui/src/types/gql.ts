/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type JournalHeaderQueryVariables = {
  id?: string | null,
};

export type JournalHeaderQuery = {
  journal:  {
    name: string | null,
  } | null,
};

export type ReviewersQueryVariables = {
  id?: string | null,
};

export type ReviewersQuery = {
  journal:  {
    stageRules:  Array< {
      canReview:  {
        journalRank: number | null,
        beenionRank: number | null,
        reviewers:  Array< {
          user:  {
            id: string,
          },
          invitation:  {
            service: string,
            handle: string,
            confirmed: boolean,
          } | null,
        } | null > | null,
      } | null,
    } | null > | null,
  } | null,
};
