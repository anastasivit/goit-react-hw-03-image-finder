import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import './App.css';

class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    query: '',
    page: 1,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const API_KEY = '36785926-9df8e575763dc5d4ea5ec1ee8';
    const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ loading: true });

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        const { hits } = data;

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, loading, selectedImage } = this.state;

    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loading && <div className="loader">Loading...</div>}
        {images.length > 0 && !loading && (
          <button className="load-more-button" onClick={this.fetchImages}>
            Load More
          </button>
        )}
        {selectedImage && (
          <div className="modal" onClick={this.handleCloseModal}>
            <div className="modal-content">
              <img src={selectedImage} alt="" className="modal-image" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
