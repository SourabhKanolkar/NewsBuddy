import React,{useEffect,useLayoutEffect,useState}  from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News=(props)=>{
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const[totalResults,setTotalResults]=useState(0);
  
  // document.title = `${capLetter(props.category)} - NewsMonkey`

 const capLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 

 const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
 
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);

  }

  useEffect(() => {
    updateNews();
  }, []);


 const handelPrevious = async () => {
    console.log("old page")

    setPage(page-1)
    updateNews()


  }
  const handelNext = async () => {
    console.log("next page");
    setPage(page+1);
    updateNews();
  }
 const fetchMoreData = async () => {
    
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);

  };


  
    return (
      <div className='container my-3'>
        <h2 style={{marginTop:"60px"}} className='text-center'>NewsMonkey - Top   {capLetter(props.category)} Headlines  </h2>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
         <div className="container">

        
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url} >
                <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.news18.com/ibnlive/uploads/2024/04/srh-vs-dc-ipl-2024-2024-04-d9ea568c0fae080165d86ead7769d99a-16x9.jpg?impolicy=website&width=1200&height=675"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
}
News.propsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
