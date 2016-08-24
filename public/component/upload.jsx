import React from 'react';
import request from 'superagent';
import _ from 'lodash';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
      uploadedImages: []
    }
  }
  render() {
    return <div>
      <div>
        {this.state.uploadedImages.map(i => <img src={i} />)}
      </div>
      <form onSubmit={this._onSubmit.bind(this)}>
        <div>
          <input type="file" className="comment-pic-upd" accept=".jpg,.jpeg,.png,.gif"
                 onChange={(e) => this._handleImageChange(e)}/>
          <img src="images/upload-pic.png" className="upload-img"/>
        </div>
          <input type="submit" value='Upload' className="submit-picture"/>
      </form>
    </div>
  }

  _handleImageChange(event) {
    const file = event.target.files[0];
    this.setState({
      selectedImage: file
    });
  }

  _onSubmit(event) {
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
}

export default UploadForm;
