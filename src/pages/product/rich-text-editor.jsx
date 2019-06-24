import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
//导入文本编辑器的样式
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types';


/*
* 富文本编辑组件
*/
export default class RichTextEditor extends Component {

    static propTypes =  {
        detail: PropTypes.string
    }

    constructor(props) {

        super(props);
        const { detail } = this.props;
        let editorState;
        if(detail){
            const contentBlock = htmlToDraft(detail);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks, null);
            editorState = EditorState.createWithContent(contentState);
        }else { //没有内容时创建一个空的编辑器
            editorState = EditorState.createEmpty();
        }

        this.state = {
            editorState,
        };
    }

    //状态数据
    state = {
        editorState: EditorState.createEmpty(), //创建一个没有内容的富文本编辑器
    }

    //富文本编辑器内容发生改变触发的回调函数
    onEditorStateChange = (editorState) => {

        //更新状态
        this.setState({
            editorState,
        });
    };

    //获取富文本编辑器中的内容
    getDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    }

    //渲染组件
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperStyle={{ minHeight: 200, border: '1px solid black', paddingLeft: 10 }}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}


