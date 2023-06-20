import Vote from "../feed/Vote";
import Actions from "../feed/Actions";
import Info from "../feed/Info";
import Link from "next/link";
const style = {
  post: "flex flex-col space-y-1",
  postTitle: "text-lg font-medium text-[#D7DADC]",
  postContent: "text-sm font-light text-[#D7DADC]/80",
  wrapper: "flex space-x-3 rounded bg-[#1a1a1b]/80 p-2 border border-[#343536]",
};

const Post = (post) => {
  return (
    <div className={style.wrapper}>
      <Vote count={post.vote_up - post.vote_down} />
      <Link href={`/discussions/post/${post.id}`}>
      <div className={style.post}>
        <Info author={post} />
        <h1 className={style.postTite}>{post.title}</h1>
        <p className={style.postContent}>{post.content}</p>
        <p className={style.postContent}>{post.author?.name}</p>
        <Actions />
      </div>
      </Link>
    </div>
  );
};
export default Post;
