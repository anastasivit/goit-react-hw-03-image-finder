import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick, onLoadMore }) => (
  <ul className={styles.gallery}>
    {images.map(({ id, webformatURL, tags }) => (
      <ImageGalleryItem
        key={id}
        image={{ webformatURL, tags }}
        onClick={() => onImageClick(webformatURL)}
      />
    ))}
    {images.length > 0 && (
      <li className={styles['load-more']}>
        <button type="button" onClick={onLoadMore}>
          Load More
        </button>
      </li>
    )}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default ImageGallery;
