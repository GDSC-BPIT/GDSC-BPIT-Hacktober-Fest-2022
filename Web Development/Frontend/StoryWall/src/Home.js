import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const {
    error,
    isPending,
    data: blogs,
  } = useFetch("http://localhost:8000/blogs");

  return (
    <div
      className='home'
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
      <div className='designs'></div>
    </div>
  );
};

export default Home;
