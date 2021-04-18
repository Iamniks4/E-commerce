import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts, deleteProductByAdmin, createProductByAdmin } from '../actions/productActions';
import { productConstants } from '../constants/productConstants';
import Paginate from '../components/Paginate';

const ProductListScreen = ({ history, match }) => {

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, pages, page } = productList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: productDeleteLoading, success, error: productDeleteError } = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const { loading: productCreateLoading , success: successCreate , product: createdProduct, error: productCreateError } = productCreate;

    useEffect(() => {
        dispatch({ type: productConstants.PRODUCT_CREATE_RESET });
        if (!userInfo.isAdmin) {
            history.push('/login');
        }

        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber));
        }

    }, [dispatch, history, userInfo, success, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            // delete products
            dispatch(deleteProductByAdmin(id));
        }
    }

    const createProductHandler = () => {
        dispatch(createProductByAdmin());
    }

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {productDeleteLoading && <Loader />}
            {productDeleteError && <Message variant='danger'>{productDeleteError}</Message>}

            {productCreateLoading && <Loader />}
            {productCreateError && <Message variant='danger'>{productCreateError}</Message>}

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <i className='fas fa-trash' />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true} />
                </>}
        </>
    )
}

export default ProductListScreen;
