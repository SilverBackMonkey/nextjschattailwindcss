import Post from "../common/Post";
const style = {
  wrapper: 'space-y-2.5',
};

const Feed = ({ post }) => {
  return (
    <div className={style.wrapper}>
      {post.map((post, id) => (
        
        <Post {...post} key={id} />
      ))}
    </div>
  );
};

export default Feed;
