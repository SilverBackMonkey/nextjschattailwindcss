import Image from "next/image";
import DisplayDate from "../functions/DisplayDate";
import { UpvoteIcon } from "../common/UpvoteIcon";
import { DownvoteIcon } from "../common/DownvoteIcon";
import { AnnotationIcon } from "../common/AnnotationIcon";
const Comments = (comments) => {
  const commentsLoop = comments.comments;
 
  //console.log(comments); update
  const style = {
    profileImage: "object-contain",
    profileImageContainer:
      "h-[1.2rem] w-[1.2rem] overflow-hidden rounded-full relative",
    postInfoContainer: "flex gap-[.4rem]",
    icon: "text-[#818384]",
    icons: "flex flex-row items-center gap-[.4rem]",
    commentContainer: "my-[1rem] flex flex-col gap-[1rem]",
    commentsWrapper: "bg-[#1A1A1B] p-4",
    reply: "flex items-center gap-[.2rem] text-[#818384]",
  };
  const auth = "Author"
  const img =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAHVJREFUKFNjrKura/j06RP/+/fvBT5+/CiATjP29/cXgCQ+fPjA/+HDBxCNghnnzp2b8OnTJ7BOZJNgChnXr18fAONgM4lx9+7dDl++fBF49+4dyAQMkxjPnz9vgG4vskmM9+/fV0BWgG4SI8hx2FwPEgOZBACHNbSCBLKzegAAAABJRU5ErkJggg==";

  return (
    <>
      <div className={style.commentsWrapper}>
        {commentsLoop && commentsLoop.map((comment, id) => (
           
              <div key = {comment.id} className={style.commentContainer}>
                <div className={style.postInfoContainer}>
                  <div className={style.profileImageContainer}>
                    <Image
                      src={comment.author?.image ?? img}
                      className={style.profileImage}
                      alt={comment.author.name ?? auth}
                      fill
                    />
                  </div>
                  <span>{comment.author?.name ?? auth}</span>
                  <span>•</span>
                  <span>
                    {DisplayDate(comment.createdAt)}
                  </span>
                </div>
                <div>{comment.content}</div>
                <div className={style.icons}>
                  <span className={style.icon}>
                    <UpvoteIcon />
                  </span>
                  <span>0</span>
                  <span className={style.icon}>
                    <DownvoteIcon />
                  </span>
                  <span className={style.reply}>
                    <AnnotationIcon />
                    <span>Reply</span>
                  </span>
                  <span className={style.icon}>Give</span>
                  <span className={style.icon}>Share</span>
                </div>
              </div>
            
          ))}
      </div>
    </>
  );
};
export default Comments;
