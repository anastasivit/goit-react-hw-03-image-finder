import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import styles from './App.css';

class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    query: '',
    page: 1,
    showModal: false,
    selectedImage: '',
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
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&per_page=12`;

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
    this.setState({ selectedImage: imageUrl, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  render() {
    const { images, loading, showModal, selectedImage } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={images}
          onImageClick={this.handleImageClick}
          onLoadMore={this.handleLoadMore}
        />
        {loading && <div>Loading...</div>}
        {showModal && (
          <div>
            <img src={selectedImage} alt="" />
            <button onClick={this.handleCloseModal}>Close</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
