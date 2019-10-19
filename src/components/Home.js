import React, { Component, Fragment } from 'react';

import "../css/Home.css";
import DisplayItem from './DisplayItem';
// import { thisTypeAnnotation } from '@babel/types';

class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoaded: false,
      items: [{}]
    }

    this.resource = "https://dbpedia.org/resource/";

    this.searchWiki = this.searchWiki.bind(this);
    this.setEmptyItems = this.setEmptyItems.bind(this);
  }

  componentDidMount(){
    this.searchWiki();
  }

  setEmptyItems() {
    this.setState({
      isLoaded: true,
      items: []
    })
    return;
  }

  async searchWiki(searchBox){
    if (this.refs.srch.value === ''){

      this.setState({
        isLoaded: true,
        items: [{thumbnail: "https://image.flaticon.com/icons/png/128/49/49116.png", abstract: "Search Wikipedia..."}]
      })

      return;
    }

    // Parsing search
    var search = this.refs.srch.value.split(" ").join("_");

    await fetch("http://dbpedia.org/data/" + search + ".json")
          .then(data => data.json())
          .then(data => {

            var results = {};
            var object = data["http://dbpedia.org/resource/" + search];
            console.log(object);
            if(object === undefined){
              this.setEmptyItems();
              return;
            }

            try{
              object['http://dbpedia.org/ontology/abstract'][0]['value'] !== undefined ? object['http://dbpedia.org/ontology/abstract'].forEach(element => { if (element.lang == "en") {results.abstract = element.value; return;}}) : this.setEmptyItems();
              object['http://dbpedia.org/ontology/thumbnail'][0]['value'] !== undefined ? results.thumbnail = object['http://dbpedia.org/ontology/thumbnail'][0]['value'] : this.setEmptyItems();
              console.log(results.abstract);
            }
            catch(err){
              console.log(err);
              this.setEmptyItems();
              return;
            }

            this.setState({
              isLoaded: true,
              items: [results]
            })
          });
  }

  render() {
    var {items} = this.state;

    return(
      <Fragment>
        <div className="homeContainer">
          <div className="searchBox">
            <input type="text" ref="srch" name="searchBox"></input>
            <button onClick={this.searchWiki} value="send">SEARCH...</button>
          </div>
          <div className="itemsContainer">
            {
              items.length > 0 ? items.map((item,key) => { return <DisplayItem img={item.thumbnail} key={key} title={item.abstract}/>}) : <DisplayItem key={0} img={"https://static.thenounproject.com/png/385145-200.png"} title={"No results"}/>
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;