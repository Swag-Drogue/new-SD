import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import request from 'superagent'
import _ from 'lodash';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      title: '',
      selectedImage: null,
      content: '',
      uploadedImages: []
    }
  }

  componentWillMount() {
    request
      .get('/api/sessions/current')
      .end((err, res) => {
        if (err) {
          if (res.statusCode === 403) {
            alert('请先登录！');
            return hashHistory.push('/login');
          }
        }
        return this.setState({
          author: res.text
        });
      });
  }

  render() {
    return <div className="wrapper container-fluid">
      <form onSubmit={this._onSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="title">标题</label>
          <input type="text" className="form-control" id="title" placeholder="请输入标题"
                 value={this.state.title}
                 onChange={this._onTitleChange.bind(this)}
                 required="true"/>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="images">图片</label>
            <div>
              {this.state.uploadedImages.map(i => <img className="img-responsive" key={i} src={i}/>)}
            </div>
            <input type="file" id="images" className="btn btn-default" required="true" accept=".jpg,.jpeg,.png,.gif"
                   onChange={(e)=>this._handleImageChange(e)}/>
            <input type="button" className="btn btn-default" value='上传图片' onClick={this._onImgUpload.bind(this)}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name">文本框</label>
          <textarea className="form-control" rows="3" required="true"
                    value={this.state.content}
                    onChange={this._onArticleChange.bind(this)}/>
        </div>
        <button className="btn btn-default btn-right" type="submit">提交</button>
      </form>
    </div>
  }

  _onTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  _handleImageChange(event) {
    const file = event.target.files[0];
    this.setState({
      selectedImage: file
    });
  }

  _onImgUpload(event) {

    const formData = new FormData();
    formData.append('image', this.state.selectedImage);

    request.post('/api/uploaded-images')
      .send(formData)
      .end((err, res) => {
        if (err) return alert('uploading failed!');
        const uploadedImagePath = res.text;
        this.setState({
          uploadedImages: _.concat(this.state.uploadedImages, uploadedImagePath)
        });
      })
  }

  _onArticleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  _onSubmit(event) {
    event.preventDefault();
    request.post('/api/articles')
      .send({
        author: this.state.author,
        title: this.state.title,
        content: this.state.content,
        images: this.state.uploadedImages
      })
      .end((err, res)=> {
        if (err) return alert(res.text);
        return hashHistory.push('/share/' + res.body._id);
      });
  }
}
