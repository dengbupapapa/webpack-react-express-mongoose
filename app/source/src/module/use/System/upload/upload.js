import {
    Component
} from 'react';

import {
    IndexLink,
    Link
} from 'react-router';

import {
    Upload,
    Icon,
    Modal
} from 'antd';

class upload extends Component {

    constructor(props) {

        super(props);

    }

    componentDidMount() {

        fetch('/async/upload/images/find', {
                method: 'post'
            })
            .then(response => response.json(), err => err)
            .then(json => {
                this.setState({
                    imgs: json.result
                })
            });

    }

    state = {
        imgs: [],
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    }

    handleCancel = () => this.setState({
        previewVisible: false
    })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({
        fileList
    }) => this.setState({
        fileList
    })

    render() {
        // fetch('/async/post', {
        //         method: 'post'
        //     })
        //     .then(response => response.json(), err => err)
        //     .then(json => console.log(json));
        const {
            previewVisible,
            previewImage,
            fileList
        } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        let imgs = this.state.imgs.map((item, i) => <img key={i} src={'/async/upload/find'+item.path}/>);

        return (
            <div className="clearfix">
                {imgs}
                <Upload
                    action="/async/upload/images/insert"
                    listType = "picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>

            </div>
        );
    }
}

import * as async from 'rActions/async';
import * as loadIng from 'rActions/loadIng';
import * as localStorageDemo from 'rActions/localStorageDemo';

const actiontor = Object.assign({}, async, loadIng, localStorageDemo);

import connectReduxToReact from 'jStatic/connectReduxToReact'

// const State = (state) => state;
const loadIngState = state => state.loadIngAction;
// const sendAsyncState = (state) => state.sendAsyncAction;

export default connectReduxToReact(upload, {
    // State,
    loadIngState,
    // sendAsyncState
}, actiontor)