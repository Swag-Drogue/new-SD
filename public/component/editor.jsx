import React, {Component} from 'react';
import {Link, hashHistory} from 'react-router';
import request from 'superagent';
import App from './app.jsx';
import UploadForm from './upload.jsx';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    }
  }

  componentWillMount() {
    request
      .get('/api/sessions/current')
      .end((err, res) => {
        if (err) {
          if (res.statusCode === 403) {
            alert('请先登录');
            return hashHistory.push('/login');
          } else {
            return alert(err);
          }
        }
      });
  }

  render() {
    return (
      <div className="container-fluid wrapper">
        <div>
          <App/>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="title"><h3>标题：</h3></label>
            <input type="text" className="form-control" id="title" placeholder="请在此输入标题"
                   onChange={this._onTitleChange.bind(this)} required/>
          </div>
          <label htmlFor="text-body"><h3>内容：</h3>
          </label>
          <div id="text-body">
            <div className="upload">
              <UploadForm/>
            </div>
            <div className="p-body" contentEditable="true" placeholder="在此输入正文"
                 onChange={this._onContentChange.bind(this)}></div>
          </div>
          <button className="submit" onClick={this._onSubmit.bind(this)}>
            <Link to="/share">发布</Link>
          </button>
        </form>
      </div>
    )
  }

  _onTitleChange(event) {
    this.setState({
      title: event.target.value
    })
  }

  _onContentChange(event) {
    this.setState({
      content: event.target.value
    })
  }

  _onSubmit() {
    request
      .post('')
      .send({
        title: this.state.title,
        content: this.state.content
      })
      .end((err, res) => {
        if (err) return alert(res.text);
        alert(res.text);
      })
  }
}



