import React from 'react';

interface LikeButtonProps {
  liked: boolean;
  likeCount: number;
  onToggleLike: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ liked, likeCount, onToggleLike }) => {
  const heartIconClass = `w-5 h-5 ${liked ? 'text-red-500' : 'text-gray-400'} transition-colors`;

  return (
    <button
      className="flex items-center space-x-1 focus:outline-none"
      onClick={onToggleLike}
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      <svg className={heartIconClass} viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 3.314C12.955-1.778 22-1.223 22 6.294c0 4.5-5.5 7.5-11 11.5-5.5-4-11-7-11-11.5 0-7.5 9.045-8.067 11-3.294z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-gray-500">{likeCount}</span>
    </button>
  );
};

export default LikeButton;
