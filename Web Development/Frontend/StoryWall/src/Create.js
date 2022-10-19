import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("adrija");
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const blog = { title, body, author };

    fetch("http://localhost:8000/blogs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      // history.go(-1);
      history.push("/");
    });
  };

  return (
    <div className='create'>
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <h4>Blog title:</h4>
        </label>
        <input
          type='text'
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label>
          <h4>Blog body:</h4>
        </label>
        <textarea
          required
          value={body}
          onChange={e => setBody(e.target.value)}
        ></textarea>
        <label>
          <h4>Blog author:</h4>
        </label>
        <select value={author} onChange={e => setAuthor(e.target.value)}>
          <option value='adrija'>adrija</option>
          <option value='anjana'>anjana</option>
          <option value='arunangshu'>arunangshu</option>
        </select>
        <button>Add Blog</button>
      </form>
    </div>
  );
};

export default Create;
