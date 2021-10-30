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

        if (typeNo === 1) {
            type = "자유게시판";
        } else if (typeNo === 2) {
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

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default ReadBoardComponent;