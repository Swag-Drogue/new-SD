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
    return <div className="wrapper container">
      <div className="row all-article-cell">
        {this.state.allArticles.map((article, index)=> <div key={index} className="col-xs-4 article-cell">
          <Link to={'/share/' + article._id}>
            <img className="img-responsive" src={article.images[0]}/>
          </Link>
          <p>{article.title}</p>
        </div>)}
      </div>
    </div>
  }
}
