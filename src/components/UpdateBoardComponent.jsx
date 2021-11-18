import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class UpdateBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            no: this.props.match.params.no,
            board: {}, 
            type: '',
            title: '',
            contents: ''
        }
    }

    changeTypeHandler = (event) => {
        this.setState({ type: event.target.value });
        //this.state.board.setType({ type: event.target.value});
    }

    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changeContentsHandler = (event) => {
        this.setState({ contents: event.target.value });
    }

    updateBoard = (event) => {
        event.preventDefault();

        let board = {
            type: this.state.type,
            title: this.state.title,
            contents: this.state.contents,
            userId: this.state.userId
        };
        console.log('Board ===> ' + JSON.stringify(board));


        BoardService.updateBoard(this.state.no, board).then(res => {
            this.props.history.push(`/read-board/${this.state.no}`);
        });
    }

    componentDidMount() {
        BoardService.getOneBoard(this.state.no).then(res => {
            this.setState({ 
                board: res.data,
                type: res.data.type,
                title: res.data.title,
                contents: res.data.contents
            });
        });
    }

    returnDate(createDate, updateDate) {
        return (
            <div className="row">
                <label>생성일 :  [ {createDate} ] / 수정일 : [ {updateDate} ]</label>
            </div>
        )
    }

    cancel() {
        this.props.history.push('/board');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">수정</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Type </label>
                                        <select placeholder="type" name="type" className="form-control"
                                            value={this.state.type} onChange={this.changeTypeHandler}>
                                            <option value="1">자유게시판</option>
                                            <option value="2">질문과 답변</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Title </label>
                                        <input type="text" placeholder="제목" name="title" className="form-control"
                                            value={this.state.title} onChange={this.changeTitleHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Contents  </label>
                                        <textarea placeholder="내용" name="contents" className="form-control"
                                            value={this.state.contents} onChange={this.changeContentsHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> UserId  </label>
                                        <input placeholder="작성자" name="userId" className="form-control"
                                            value={this.state.board.userId} readOnly/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateBoard}>수정하기</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>취소</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateBoardComponent;