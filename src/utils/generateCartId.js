import uniqid from 'uniqid';

const generateCartId = (req, res) => {
  if (!req.session.cartId) {
    let cartId = uniqid();
    req.session.cartId = cartId;
    res.cookie('cartId', cartId);
    return res.status(200).json({
      cart_id: cartId
    })
  } else {
    return res.status(200).json({
      cart_id: req.session.cartId
    })
  }
}

export default generateCartId;
