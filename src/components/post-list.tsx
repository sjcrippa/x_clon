import PostCard from './post-card'

export function PostList ({ posts }) {
  return (
    <>
      {
        posts?.map(post => {
          const {
            id,
            user,
            content
          } = post

          const {
            user_name: userName,
            name: userFullName,
            avatar_url: avatarUrl
          } = user

          return (
            <PostCard
              key={id}
              userName={userName}
              userFullName={userFullName}
              avatarUrl={avatarUrl}
              content={content}
            />
          )
        })
      }
    </>
  )
}
