import React, {useState} from 'react';

interface props {
    submit: (description: any) => void
}
const NewsComment: React.FC<props> = ({submit}) => {
    const [error, setError] = useState(false);
    const [description, setDescription] = useState('');

    const _onChange = (e: any) => {
        e.preventDefault();
        setDescription(e?.target?.value);
        if(e.target.value && e.target.value != '') {
            setError(false);
        }
    }

    const _onClick = (e) => {
        e.preventDefault();
        if(!description || description == '') {
            setError(true);
            return;
        }
        submit(description);
    }

    return (
        <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea 
                    id="comment" 
                    rows={6}
                    value={description}
                    onChange={_onChange}
                    className={`w-full px-3 py-2 placeholder-gray-300 border ${!error?'border-gray-300':'border-rose-500'} rounded-md mt-6 text-lg focus:outline-none focus:border-current dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500`}
                    placeholder="Write a comment..." required></textarea>
            </div>
            <button 
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                onClick={_onClick}
                >
                Post comment
            </button>
        </form>
    );
}

export default NewsComment;