import React, {Component} from 'react';
import {Link} from 'react-router';
import request from 'superagent';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allArticles: []
    };
  }

  componentWillMount() {
    request
      .get('/api/articles')
      .end((err, res)=> {
        if (err) return res.text;
        this.setState({
          allArticles: res.body
        });
      })
  }

  render() {
    return <div className="wrapper-articles container">
      {this.state.allArticles.map((article)=>
        <div key={article._id} className="cell">
          <Link to={'/share/' + article._id}>
            <div className="img-instruc"><img className="img-responsive" src={article.images[0]}/></div>
          </Link>
          <div className="instruction"><p>{article.title}</p></div>
        </div>)}
    </div>
  }
}
