import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [author, setAuthor] = useState('mario');
const [isPending, setIsPending] = useState(false);
const history = useHistory();

const handleSubmit = (e) => {
    const blog = {title, body, author};
    setIsPending(true);

    fetch('http://localhost:8000/blogs',{
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(blog)
        }).then(setTimeout(() => {
            console.log('New blog added');
            setIsPending(false);
            history.push('/');
        }, 1000));
    e.preventDefault();
}

    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                <label>Blog body:</label>
                <textarea value={body}
                     onChange={(e) => setBody(e.target.value)}>
                    required
                    </textarea>   
                <label>Blog author:</label>
                <select 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
                <p>{title}</p>
                <div>{body}</div>
                <p>{author}</p>
            </form>
        </div>
      );
}
 
export default Create;