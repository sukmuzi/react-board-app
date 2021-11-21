import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            no: this.props.match.params.no,
            board: {}
        }
    }

    componentDidMount() {
        BoardService.getOneBoard(this.state.no).then(res => {
            this.setState({ board: res.data });
        });
    }

    returnBoardType(typeNo) {
        let type = null;

        if (typeNo === '1') {
            type = "자유게시판";
        } else if (typeNo === '2') {
            type = "질문과 답변 게시판";
        } else {
            type = "타입 미지정";
        }

        return (
            <div className="row">
                <label>Board Type : </label> {type}
            </div>
        )
    }

    returnDate(createDate, updateDate) {
        return (
            <div className="row">
                <label>생성일 :  [ {createDate} ] <br/> 수정일 : [ {updateDate} ]</label>
            </div>
        )
    }

    goToList() {
        this.props.history.push('/board');
    }

    goToUpdate(no) {
        this.props.history.push(`/update-board/${no}`);
    }

    goToDelete = async function () {
        if(window.confirm('글을 삭제하시겠습니까?')) {
            BoardService.deleteBoard(this.state.no).then(res => {
                if(res.status === 200) {
                    alert('삭제하였습니다.');
                    this.props.history.push('/board');
                } else {
                    alert('글 삭제가 실패하였습니다.');
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> Read Detail</h3>
                    <div className="card-body">
                        {this.returnBoardType(this.state.board.type)}<br/>
                        <div className="row">
                            <label> Title : </label> {this.state.board.title}
                        </div><br/>

                        <div className="row">
                            <label> Contents : </label><br/>
                            <textarea value={this.state.board.contents} readOnly />
                        </div ><br/>

                        <div className="row">
                            <label> UserId : </label> {this.state.board.userId}
                        </div><br/>

                        {this.returnDate(this.state.board.createDate, this.state.board.updateDate)}
                        <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{ marginLeft: "10px" }}>목록</button>
                        <button className="btn btn-success" onClick={() => this.goToUpdate(this.state.no)} style={{ marginLeft: "10px" }}>수정</button>
                        <button className="btn btn-danger" onClick={() => this.goToDelete()} style={{ marginLeft: "10px" }}>삭제</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReadBoardComponent;