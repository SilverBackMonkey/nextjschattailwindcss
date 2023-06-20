import DisplayDate from "../functions/DisplayDate";
import Image from "next/image";
const style = {
  profilePic: "h4 w-4 rounded-full",
  wrapper: "flex items-center space-x-1 text-xs text-[#818384]",
  profilePicContainer:
    "h-[1.2rem] w-[1.2rem] overflow-hidden rounded-full relative",
  postedBy: "flex items-center space-x-1",
  tag: "cursor=pointer text-xs font-semibold text-[#D7DADC] hover:underline",
};
const Info = ({ author }) => {
  const img =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAHVJREFUKFNjrKura/j06RP/+/fvBT5+/CiATjP29/cXgCQ+fPjA/+HDBxCNghnnzp2b8OnTJ7BOZJNgChnXr18fAONgM4lx9+7dDl++fBF49+4dyAQMkxjPnz9vgG4vskmM9+/fV0BWgG4SI8hx2FwPEgOZBACHNbSCBLKzegAAAABJRU5ErkJggg==";

  return (
    <div className={style.wrapper}>
      <div className={style.profilePicContainer}>
        <Image
          className={style.profilePic}
          src={author.author?.image ?? img}
          alt = {'Author'}
          fill
        />
      </div>
      <div className={style.tag}>{author?.name}</div>
      <div>•</div>
      <div className={style.postedBy}>
        <span>Posted By {author.author?.name ?? 'Author'}</span>
        <span>•</span>
        <span>
          <DisplayDate date={author.createdAt} />
        </span>
      </div>
    </div>
  );
};
export default Info;
