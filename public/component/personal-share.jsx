import React, {Component} from 'react';
import request from 'superagent';

export default class ShareArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      title: '',
      images: [],
      content: '',
    }
  }

  componentWillMount() {
    request
      .get(`/api/articles/${this.props.params.id}`)
      .end((err, res)=> {
        if (err) return alert('页面错误');
        return this.setState({
          author: res.body.author,
          title: res.body.title,
          images: res.body.images,
          content: res.body.content
        })
      })
  }

  render() {
    return <div className="container wrapper">
      <div className="article">
        <h3>{this.state.title}</h3>
        <h4>作者：{this.state.author}</h4>
        <div>
          {this.state.images.map((i, index) => <img className="img-responsive" key={index} src={i}/>)}
        </div>
        <p>{this.state.content}</p>
      </div>
    </div>
  }
}
