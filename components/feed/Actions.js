import { GiftIcon } from "../common/GiftIcon";
import { ShareIcon } from "../common/ShareIcon";
import { AnnotationIcon } from "../common/AnnotationIcon";
const style = {
  iconContainer: "flex items-center, space x-1, text-[#818384]",
  wrapper: "flex items-center, space-x-4 pt-2 ",
};
const Actions = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.iconContainer}>
        <AnnotationIcon />
        <span className="text-xs">19 Comments</span>
      </div>
      <div className={style.iconContainer}>
        <GiftIcon />
        <span className="text-xs">Awards</span>
      </div>
      <div className={style.iconContainer}>
        <ShareIcon />
        <span className="text-xs">Share</span>
      </div>
    </div>
  );
};
export default Actions;
