"use client";
import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";

interface Props {
  message: any;
  show: boolean;
  setShow: (boolean) => void;
  saveMessage: (message: any) => void;
}

const CommentEditModal: React.FC<Props> = ({
  message,
  show,
  setShow,
  saveMessage,
}) => {
  const [comment, setComment] = useState(message.message);
  useEffect(() => {
    setComment(message.message);
  }, [message]);

  const submit = () => {
    message.message = comment;
    saveMessage(message);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  return (
    <>
      <Modal
        title="Comment Edit"
        show={show}
        setShow={setShow}
        type="success"
        submit={submit}
      >
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 max-w-lg">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={handleChange}
            rows={6}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required={true}
          ></textarea>
        </div>
      </Modal>
    </>
  );
};

export default CommentEditModal;
