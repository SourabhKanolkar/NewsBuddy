import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps= {
    country:"in",
    pageSize:8,
    category:"general",
  }
  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  
  constructor(){
    super();
    this.state ={
      articles: [],
      loading:false,
      page:1
    }
 }

//  updateNews= async()=>{
//   const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5846e2e28494ec783cfec217d6d58b7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//   this.setState({loading:true});
//   let data= await fetch(url);
//   let parsedData= await data.json();
//   this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false})

//  }

 async componentDidMount(){
    console.log("cdm");
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5846e2e28494ec783cfec217d6d58b7&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data= await fetch(url);
    let parsedData= await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false})
  }
handelPrevious=async()=>{
    console.log("old page")
    
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5846e2e28494ec783cfec217d6d58b7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
   let data= await fetch(url);
   let parsedData= await data.json();
   this.setState({
    page:this.state.page - 1,
    articles: parsedData.articles,
    loading:false
   })
      // this.setState({page: this.state.page - 1})
      // this.updateNews()


  }
 handelNext=async()=>{
   console.log("next page");
   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5846e2e28494ec783cfec217d6d58b7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data= await fetch(url);
    let parsedData= await data.json();
    
 
    this.setState({
     page:this.state.page + 1,
     articles: parsedData.articles,
     loading:false
    }) }
  // this.setState({page: this.state.page + 1})
  // this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsMonkey - Top Headlines</h2>
       {this.state.loading && <Spinner />}

      
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url} >
          <Newsitem   title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://images.news18.com/ibnlive/uploads/2024/04/srh-vs-dc-ipl-2024-2024-04-d9ea568c0fae080165d86ead7769d99a-16x9.jpg?impolicy=website&width=1200&height=675"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}  />
          </div>
        })}
          
         
         

        </div> 
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handelPrevious} >&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handelNext} >&rarr; Next</button>
        </div>
      </div>
    )
  }
}

export default News
