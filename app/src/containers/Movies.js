import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService'

class Movies extends Component {
  state = { movies: getMovies() }

  deleteMovieHandler = movie => {
    let { movies: stateMovies } = { ...this.state }
    const updateMovies = stateMovies.filter(m => {
      return m._id !== movie._id
    })
    this.setState({ movies: updateMovies })
  }
  render() {
    const { movies } = this.state
    let content

    if (movies.length === 0) {
      content = <p>There are no movies in the database</p>
    } else {
      content = (
        <React.Fragment>
          <p>Showing {movies.length} in the database</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => this.deleteMovieHandler(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="fa fa-trash-o pr-1"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      )
    }
    return (
      <div className="row">
        <div className="col-12">{content}</div>
      </div>
    )
  }
}
export default Movies
