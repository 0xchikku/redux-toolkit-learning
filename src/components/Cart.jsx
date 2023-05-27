
import { useSelector, useDispatch } from "react-redux";
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { remove } from '../store/cartSlice';

function Cart() {

  const cartProducts = useSelector(state => state.cart);
  const dispatch = useDispatch();


  const removeFromCart = (product) => {
    dispatch(remove(product));
  }

  const cards = cartProducts.map((product) => (
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
        <Button variant="danger" 
          onClick={() => removeFromCart(product)}
        >Remove
        </Button>
      </Card.Footer>
    </Card>
    </div>
  ));

  const spinner = (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

  return (
    <>
      <h1 className="text-center">Cart</h1>
      <div className='row'>
        {cards.length ? cards : spinner}
      </div>
    </>
  )
}

export default Cart