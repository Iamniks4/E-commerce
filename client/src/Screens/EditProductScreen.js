import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProductByAdmin } from '../actions/productActions';
import { productConstants } from '../constants/productConstants'
import axios from 'axios';

const EditProductScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate

  useEffect(() => {
      if(success) {
          dispatch({ type: productConstants.PRODUCT_UPDATE_RESET })
          history.push('/admin/productlist');
      } else {
        if(!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
      }      
  }, [ product, dispatch, productId, history, success ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProductByAdmin({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
    }))
  }

  const uploadFileHandler = async(e) => {
      const file = e.target.files[0]
      const formData = new FormData();
      formData.append('image', file)
      setUploading(true);
      try {
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }

          const { data } = await axios.post('http://localhost:3000/api/upload', formData, config);

          setImage(data);

          setUploading(false);

      } catch (error) {
          console.log(error);

          setUploading(false);
      }
  }

  return (
    <>
        <Link to='/admin/productList' className='btn btn-light my-3'>
            Go Back
        </Link>
    
    <FormContainer>
      <h1>Edit Product</h1>
      
      {loadingUpdate && <Loader/>}

      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 


      (<Form onSubmit={submitHandler}>

      <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='image'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Image URL'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
          {uploading && <Loader />}
        </Form.Group>

        <Form.Group controlId='brand'>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Brand-Name'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Category Name'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='countInStock'>
          <Form.Label>Count in stock</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter Count In Stock'
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        

        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form> )}
    </FormContainer>
    </>
  )
}

export default EditProductScreen;
