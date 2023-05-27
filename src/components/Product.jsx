import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice'
import { getProducts } from '../store/productSlice';
import { statusCode } from '../utils/statusCode';
import Alert from 'react-bootstrap/Alert';

function Product() {

  const dispatch = useDispatch();
  const { data: products, status } = useSelector(state => state.products);

  useEffect(() => {
    if(!products.length){
      dispatch(getProducts());
    }
  }, []);

  const addToCart = (product) => {
    dispatch(add(product));
  }

  const cards = products.map((product) => (
    <div className='col-md-3 text-center' key={product.id} style={{ marginBottom: '10px' }}>
      <Card className='h-100'>
        <div className='text-center'>
          <Card.Img variant="top" src={product.image} alt={`${product.title}`} style={{width: '100px', heigth: '130px'}}/>
        </div>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          INR: {product.price}
        </Card.Text>
      </Card.Body>
      <Card.Footer style={{background: 'white'}}>
        <Button variant="primary" 
          onClick={() => addToCart(product)}
        >Add To Cart
        </Button>
      </Card.Footer>
    </Card>
    </div>
  ));

  const spinner = (
    <div className='text-center'>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  return (
    <>
      {
        (status === statusCode.LOADING || (!cards.length && status !== statusCode.ERROR)) 
        && spinner
      }
      {
        status === statusCode.IDLE 
        && <div className='row'>
            {cards}
           </div>
      }
      {
        status === statusCode.ERROR
        && <Alert key="danger" variant="danger" className='text-center'>
            Something went wrong! Contact support!
           </Alert>
      }
    </>
  );
}

export default Product;

