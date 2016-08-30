import React, {Component} from 'react';
import request from 'superagent';
import '../style/personal-share.css'

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
      <div>
        <div  className="title">
          <h3>{this.state.title}</h3>
        </div>
        <h4 className="author">作者：{this.state.author}</h4>
        <div className="uu">
          {this.state.images.map(i => <img className="img-responsive" key={i} src={i}/>)}
        </div>
        <p className="content">{this.state.content}</p>
      </div>
    </div>
  }
}
