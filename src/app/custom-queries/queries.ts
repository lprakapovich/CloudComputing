export const getUser = `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      imageUri
      status
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          chatRoom {
            id
            chatRoomUsers {
              items {
                user {
                  id
                  name
                }
              }
            }
            lastMessageID
            lastMessage {
              id
              content
              createdAt
              userID
            }
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const listUsers = `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        imageUri
        status
        chatRoomUser {
          items {
            id,
            chatRoom {
              id,
              chatRoomUsers {
                items {
                  user {
                     name,
                     id
                  }
                }
              }
            }
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

