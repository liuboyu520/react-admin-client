import React from 'react';
import {
    Upload,
    Icon,
    Modal,
    message
} from 'antd';

import { reqDeleteImage } from '../../api';

/**
 * 图片上传组件
 */
export default class PicturesWall extends React.Component {

    state = {
        previewVisible: false, //标识是否显示大图<Modal/>组件
        previewImage: '', //大图的URL
        fileList: [], //已经上传的文件列表（受控）
    };

    //隐藏<Modal/>组件
    handleCancel = () => this.setState({previewVisible: false});

    //显示指定文件对应的大图
    handlePreview = async file => {

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    //file：当前操作的图片文件（上传/删除）
    handleChange = async ({ file, fileList }) => {
        console.log('handleChange()', file, fileList);

        //图片上传成功,将当前上传的file的信息修正（name, url）
        if(file.status === 'done'){
            const result = file.response;  //{ status: 0, data: {name: 'xxx.jpg',url: ''}  }
            if(result.status === 0){
                message.success('图片上传成功');
                const { name, url } = result.data;
                file = fileList[fileList.length -1];
                file.name = name;
                file.url = url;
            }else{
                message.error('图片上传失败');
            }
        }else if(file.status === 'removed'){ //删除图片
            const result = await reqDeleteImage(file.name);
            if(result.status === 0){
                message.success('图片删除成功');
            }else {
                message.error('图片删除失败');
            }
        }

        this.setState({fileList});
    };

    //获取所有已经上传图片文件名的数组
    getUploadImgNames = () => {
        return this.state.fileList.map(file => file.name);
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div>Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/manage/img/upload" /* 上传图片的服务器地址 */
                    accept="image/*" /* 只接收图片格式 */
                    name="image" /* 发送到后台的文件参数名 */
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}
