import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();

  return (
    <div className="container-store py-20 text-center max-w-lg mx-auto">
      <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
      <h1 className="section-heading mb-4">Order Confirmed!</h1>
      <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
      <p className="text-sm mb-8">
        Your order ID is <strong className="font-medium">{orderId}</strong>
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to={`/track-order?id=${orderId}`} className="btn-outline">Track Order</Link>
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
