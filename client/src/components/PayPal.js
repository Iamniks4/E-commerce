import React, { useEffect } from 'react'
import { useRef } from 'react';

const PayPal = (props) => {

    const paypal = useRef()

    const description = props.order.orderItems.map(item => item.name).join(', ');
    
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: description,
                            amount: {
                                currency_code: "USD",
                                value: props.order.totalPrice
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                props.successPaymentHandler(order)
                console.log(order);
            },
            onError: err => {
                console.log(err);
            }
        }).render(paypal.current)
    }, [])

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default PayPal;
