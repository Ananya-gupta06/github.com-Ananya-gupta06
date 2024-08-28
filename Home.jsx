import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";   //product ka data API se aarha hai
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);  //data is coming in array form

  async function fetchProductData() {   //API is called by async function by calling fetchapi,async function is called by useEffect.
    setLoading(true);

    try{
      const res = await fetch(API_URL);   //jo api call pe data fetch hoke aaya hai,that is now stored in res.
      const data = await res.json();   //then res ka data is formatted in json format and now stored to data.

      setPosts(data);  //post naam ke state variable p sara k sara data store karwalia hai..
    }
    catch(error) {
      console.log("Error aagya ji");
      setPosts([]);  //again set it to empty array.
    }
    setLoading(false);
  }

  useEffect( () => {
    fetchProductData();
  },[])  //[] this shows ki first render pe hmne API Call kri hai...

  return (
    <div>
      {
        loading ? <Spinner />  :
        posts.length > 0 ? 
        (<div className="grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {
            posts.map( (post) => (   //hmne sari post k liye product naam k card bnalia
            <Product key = {post.id} post={post}/> //post is passed as a prop
          ) )
          }
        </div>) :
        <div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div> 
      }
    </div>
  );
};

export default Home;