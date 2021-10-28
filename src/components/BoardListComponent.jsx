import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class BoardListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boards: []
        }
    }

    componentDidMount() {
        BoardService.getBoards().then((res) => {
            this.setState({ boards: res.data });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Board List</h2>
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
                                            <td>{board.title}</td>
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