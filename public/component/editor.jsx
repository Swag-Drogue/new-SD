import React, {Component} from 'react';
import request from 'superagent'
import _ from 'lodash';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      selectedImage: null,
      article: '',
      author:'',
      uploadedImages: []
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
    return <div className="wrapper container-fluid">
      <form onSubmit={this._onImgUpload.bind(this)}>
        <div className="form-group">
          <label htmlFor="images">图片</label>
          <div>
            {this.state.uploadedImages.map((i, index) => <img key={index} src={i}/>)}
            {/*加上key对应uploadedmagdes数组里的图片*/}
          </div>
          <input type="file" id="images" accept=".jpg,.jpeg,.png,.gif"
                 onChange={(e)=>this._handleImageChange(e)}/>
          <input type="submit" value='上传图片' onSubmit={this._onImgUpload.bind(this)}/>
        </div>
      </form>
      <form onSubmit={this._onSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="title">标题</label>
          <input type="text" className="form-control" id="title" placeholder="请输入标题"
                 value={this.state.title}
                 onChange={this._onTitleChange.bind(this)}
                 required="true"/>
        </div>

        <div className="form-group">
          <label htmlFor="name">文本框</label>
          <textarea className="form-control" rows="3"
                    value={this.state.article}
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
    event.preventDefault();

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
      article: event.target.value
    });
  }

  _onSubmit(event) {
    event.preventDefault();
    request.post('/api/articles')
      .send({
        title: this.state.title,
        article: this.state.article,
        images: this.state.uploadedImages
      })
      .end((err, res)=> {
        if (err) return alert(res.text);
        alert(res.text);
      });
  }
}
