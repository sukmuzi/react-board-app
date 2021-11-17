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
                <label>생성일 :  [ {createDate} ] / 수정일 : [ {updateDate} ]</label>
            </div>
        )
    }

    goToList() {
        this.props.history.push('/board');
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> Read Detail</h3>
                    <div className="card-body">
                        # 5.
                        {this.returnBoardType(this.state.board.type)}
                        <div className="row">
                            # 6.
                            <label> Title </label> : {this.state.board.title}
                        </div>

                        <div className="row">
                            <label> Contents </label> : <br></br>
                            <textarea value={this.state.board.contents} readOnly />
                        </div >

                        <div className="row">
                            <label> UserId  </label>:
                            {this.state.board.userId}
                        </div>

                        {this.returnDate(this.state.board.createDate, this.state.board.updateDate)}
                        # 7.
                        <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{ marginLeft: "10px" }}>글 목록으로 이동</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReadBoardComponent;