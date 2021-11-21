/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class BoardListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNum: 1,
            paging: {},
            boards: []
        }

        this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount() {
        BoardService.getBoards().then((res) => {
            console.log(res);
            this.setState({
                pageNum: res.data.pagingData.currentPage,
                paging: res.data.pagingData,
                boards: res.data.list
            });
        });
    }

    createBoard() {
        this.props.history.push('/create-board/');
    }

    readBoard(no) {
        this.props.history.push(`/read-board/${no}`);
    }

    listBoard(pageNum) {
        BoardService.getBoards(pageNum).then((res) => {
            console.log(res);
            this.setState({
                pageNum: res.data.pagingData.currentPage,
                paging: res.data.pagingData,
                boards: res.data.list
            });
        });
    }

    viewPaging() {
        const pageNums = [];

        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++) {
            pageNums.push(i);
        }

        return (pageNums.map((page) =>
            <li className="page-item" key={page.toString()} >
                <a className="page-link" onClick={() => this.listBoard(page)}>{page}</a>
            </li>
        ));
    }

    isPagingPrev() {
        console.log('paging', this.state.paging.currentPage);
        if (this.state.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard((this.state.paging.currentPage - 1))} tabindex="-1">Previous</a>
                </li>
            );
        }
    }

    isPagingNext() {
        if (this.state.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard((this.state.paging.currentPage + 1))} tabIndex="-1">Next</a>
                </li>
            );
        }
    }

    isMoveToFirstPage() {
        if (this.state.pageNum !== -1) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard(1)} tabIndex="-1">Move to First Page</a>
                </li>
            )
        }
    }

    isMoveToLastPage() {
        if (this.state.pageNum !== this.state.paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard((this.state.paging.pageNumCountTotal))} tabIndex="-1">LastPage({this.state.paging.pageNumCountTotal})</a>
                </li>
            );
        }
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
                <div className="row">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            {
                                this.isMoveToFirstPage()
                            }
                            {
                                this.isPagingPrev()
                            }
                            {
                                this.viewPaging()
                            }
                            {
                                this.isPagingNext()
                            }
                            {
                                this.isMoveToLastPage()
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default BoardListComponent;