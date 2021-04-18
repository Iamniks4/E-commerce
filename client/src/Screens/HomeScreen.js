import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { Helmet } from 'react-helmet'
import Meta from '../components/Meta';

const HomeScreen = ({ match }) => {

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch()

  const productList = useSelector( state => state.productList)

  const { loading, error, products, page, pages } = productList;

  // const [products, setProducts] = useState([]);

  useEffect(() => {
    // const fetchProducts = async() => {
    //   const { data } = await axios.get('/api/products')
    //   setProducts(data);
    // }

    dispatch(listProducts(keyword, pageNumber))

    // fetchProducts();
  },[dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
      <><Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={ keyword ? keyword : '' }/>
      </>}
    </>
  )
}

export default HomeScreen
