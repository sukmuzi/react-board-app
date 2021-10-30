import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class BoardListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boards: []
        }

        this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount() {
        BoardService.getBoards().then((res) => {
            this.setState({ boards: res.data });
        });
    }

    createBoard() {
        this.props.history.push('/create-board/');
    }

    readBoard(no) {
        this.props.history.push('/read-board/${no}');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Board List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.createBoard}> 글 작성</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th>Writer</th>
                                <th>Date Created</th>
                                <th>Date Updated</th>
                                <th>Likes</th>
                                <th>Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boards.map(
                                    board =>
                                        <tr key={board.no}>
                                            <td>{board.no}</td>
                                            <td><a onClick={() => this.readBoard(board.no)}>{board.title}</a></td>
                                            <td>{board.userId}</td>
                                            <td>{board.createDate}</td>
                                            <td>{board.updateDate}</td>
                                            <td>{board.likes}</td>
                                            <td>{board.views}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default BoardListComponent;