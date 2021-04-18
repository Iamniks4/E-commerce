import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message';
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'
import { orderConstants } from '../constants/orderConstants';
import PayPal from '../components/PayPal';

const OrderScreen = ({ match, history }) => {

    const order_id = match.params.id

    const [sdkReady, setSdkReady] = useState(false);

    const dispatch = useDispatch();

    const addDecimals = num => (Math.round(num * 100)/100).toFixed(2)

    const orderDetails = useSelector(state => state.orderDetails);

    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);

    const { success: successPay, loading: loadingPay, error: errorPay } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver, error: errorDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if(!loading) {
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    useEffect(() => {

        if(!userInfo) {
            history.push('/login')
        }

        if(!order || order._id !== order_id || successPay || successDeliver) {
            dispatch({ type: orderConstants.ORDER_PAY_RESET });
            dispatch({ type: orderConstants.ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(order_id));
        } else if(!order.isPaid) {
            if(!window.paypal){
                // addPayPalScript();  
            } else {
                setSdkReady(true);
            }
        }
    }, [order_id, dispatch, order, successPay, successDeliver, history, userInfo])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(order_id, paymentResult));
    }

    const deliverHandler = () => {
        console.log(order);
        dispatch(deliverOrder(order));
    }

    return loading
        ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <>
                    <h1>Order {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong> {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>{' '}
                                        <a href={`mailTo:${order.user.email}`}>{order.user.email}</a>
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                                        {order.shippingAddress.postalCode},{' '}
                                        {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> : <Message variant="danger">Not Delivered</Message>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p><strong>Method: </strong>
                                    {order.paymentMethod}</p>
                                    {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : <Message variant="danger">Not paid</Message>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {
                                        order.orderItems.length === 0
                                            ? <Message>Order is empty </Message>
                                            : (
                                                <ListGroup variant='flush'>
                                                    {order.orderItems.map((item, index) => (
                                                        <ListGroup.Item key={index}>
                                                            <Row>
                                                                <Col md={1}>
                                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                                </Col>
                                                                <Col>
                                                                    <Link to={`/product/${item.product}`}>
                                                                        {item.name}
                                                                    </Link>
                                                                </Col>
                                                                <Col md={4}>
                                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                                </Col>
                                                            </Row>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            )
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? <Loader /> : (
                                                // <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} options={{ clientId: process.env.PAYPAL_CLIENT_ID }}/>
                                                <PayPal order={order} successPaymentHandler={successPaymentHandler}/>
                                            )}
                                        </ListGroup.Item>
                                    )}
                                    {userInfo && userInfo.isAdmin && !order.isDelivered && order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingDeliver && <Loader />}
                                            <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                                Mark as Delivered
                                            </Button>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )
}

export default OrderScreen
