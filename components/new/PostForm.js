import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "../Loading";

const style = {
  input:
    "bg-[#1a1ab] border border=[#343536] px-4 py-2 text-left text-sm focus:outline:none",
  wrapper: "flex flex-col space-y-6",
  title: "border-b border-[#343536] pb-3 text-lg font-medium",
  postBtn:
    "bg-gray-200 px-4 py-1.5 text-xs font-semibold text-[#1A1A1B] rounded-full",
  postBtnContainer: "flex justify-end pt-2",
};

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const creatPost = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await fetch("api/post", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      router.push("/discussions");
    }
  };

  return (
    <div className={style.wrapper}>
      {isLoading && <Loading />}
      <h1 className={style.title}>Create a post</h1>
      <div className="flex flex-col space-y-2 rounded bg-[#1A1A1B] p-4">
        <input
          className={style.input}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <textarea
          className={style.input}
          name="comtent"
          id="content"
          rows="10"
          cols="30"
          placeholder="Text (Required)"
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
        />
        <div className={style.postBtnContainer}>
          <button onClick={creatPost} className={style.postBtn}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostForm;
