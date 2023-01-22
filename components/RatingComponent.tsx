
import { BsFillStarFill} from "react-icons/bs";
import { VscStarEmpty } from "react-icons/vsc";
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';

function RatingComponent({ type, id }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(Cookies.get(`${type}-${id}-ratingSubmitted`) === 'true');
  const { data: session } = useSession();

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    Cookies.set(`${type}-${id}-ratingSubmitted`, true, { expires: 365 });
    setSubmitted(true);
    const response = await fetch('/api/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
        id: id,
        rating: rating,
        comment: comment,
      }),
    });
    if (response.status === 200) {
      // Rating submitted successfully
    }
  };

  const starIcons: React.ReactNode[] = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starIcons.push(<BsFillStarFill key={i} />);
    } else {
      starIcons.push(<VscStarEmpty key={i} />);
    }
  }

  if (submitted) {
    return (
      <div>
        <p>Thank you for your rating!</p>
        <div>{starIcons}</div>
        {comment && (
          <div>
            <p>Your comment:</p>
            <p>{comment}</p>
          </div>
        )}
      </div>
    );
  }

  if (!session) {
    return (
      <div>
        <p>You must be logged in to rate this product.</p>
        <div>{starIcons}</div>
      </div>
    );
  }

  return (
    <div>
      <label>Rate this product:</label>
      <div>
        <input type="range" min="1" max="5" step="1" value={rating} onChange={handleRatingChange} />
        <div>{starIcons}</div>
      </div>
      <label>Leave a comment:</label>
      <textarea value={comment} onChange={handleCommentChange} />
      <button onClick={handleSubmit}>Submit rating</button>
    </div>
  );
}

export default RatingComponent;