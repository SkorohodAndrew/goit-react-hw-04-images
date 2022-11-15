import { useState, useEffect } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export const App = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState('');
  // state = {
  //   name: '',
  //   page: 1,
  //   images: [],
  //   loading: false,
  //   error: null,
  //   modalShow: false,
  //   modalContent: '',
  // };

  useEffect(() => {
    if (name) {
      setLoading(true);
      fetchPictures(name, page)
        .then(response => {
          setImages(prev => [...prev, ...response]);
        })
        .catch(error => console.log(error))
        .finally(setLoading(false));
    }
  }, [name, page]);

  // componentDidUpdate(prevProps, prevState) {
  //   const prevName = prevState.name;
  //   const nextName = this.state.name;
  //   const { name, page } = this.state;
  //   if (prevProps.name !== this.props.name) {

  //     this.handleChangeState();
  //   }
  //   if (prevName !== nextName) {
  //     this.fetchPictures(name, page).then(response => {
  //       this.setState({ images: response, page: page + 1, loading: false });
  //     });
  //   }
  // }

  const fetchPictures = async (name, page) => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${name}&page=${page}&key=29414226-e56ab89f6667b3612bf4ca3ef&image_type=photo&orientation=horizontal&per_page=12`
      );
      console.log(response.data.hits);
      return response.data.hits;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleChangeState = name => {
    setName(name);
    setPage(1);
    setLoading(true);
    setImages('');
  };

  const openModal = largeImg => {
    setModalShow(true);
    setModalContent(largeImg);
  };

  const closeModal = () => {
    setModalShow(false);
    setModalContent('');
  };

  // const loadMoreBtn = () => {
  //   fetchPictures(name, page).then(response => {
  //     setImages(prev => [...prev, ...response]);
  //     setPage(prevState => setPage + 1);
  //     setLoading(false);
  //   });
  // };
  const loadMoreBtn = () => {
    setPage((prev) => {
      return prev + 1;
    });
    setLoading(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleChangeState} />
      <ImageGallery images={images} onClick={openModal} />
      {modalShow && (
        <Modal OnClose={closeModal}>
          <img src={modalContent} alt="" />
        </Modal>
      )}
      {loading && <Loader></Loader>}
      {images.length > 0 && <Button onClick={loadMoreBtn} />}
    </>
  );
};
