export const GET_ORGANIZATION = `
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;

export const GET_REPOSITORY_OF_ORGANIZATION = `
{
  organization(login: "the-road-to-learn-react") {
    name
    url
    repository(name: "the-road-to-learn-react") {
      name
      url
    }
  }
}
`;

export const GET_ISSUES_OF_REPOSITORY = `
query (
  $organization: String!,
  $repository: String!,
  $cursor: String
) {
  organization(login: $organization) {
    name
    url
    repository(name: $repository) {
      id
      name
      url
      viewerHasStarred
      issues(first: 5, after: $cursor, states: [OPEN]) {
        edges {
          node {
            id
            title
            url
            reactions(last: 3) {
              edges {
                node {
                  id
                  content
                }
              }
            }
          }
        }
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
}
`;

export const getIssuesOfRepositoryQuery = (organization, repository) => `
  {
    organization(login: "${organization}") {
      name
      url
      repository(name: "${repository}") {
        name
        url
        issues(last: 5) {
          edges {
            node {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`;

export const ADD_STAR = `
mutation ($repositoryId: ID!) {
  addStar(input:{starrableId:$repositoryId}) {
    starrable {
      viewerHasStarred
    }
  }
}
`;

export const REMOVE_STAR = `
mutation ($repositoryId: ID!) {
  removeStar(input:{starrableId:$repositoryId}) {
    starrable {
      viewerHasStarred
    }
  }
}
`;
