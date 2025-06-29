import { useLocation } from 'react-router-dom';

export default function Success() {
  const { state } = useLocation();
  const { total = 0, items = [], paymentId = 'N/A' } = state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4 text-center">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>

        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Payment Summary</h2>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div className="font-medium">Total Paid:</div>
            <div>${total.toFixed(2)}</div>
            <div className="font-medium">Payment ID:</div>
            <div className="break-all">{paymentId}</div>
          </div>
        </div>

        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Purchased Items</h2>
          {items.length > 0 ? (
            <table className="w-full text-left text-sm text-gray-700">
              <thead>
                <tr className="border-b">
                  <th className="py-1">Item</th>
                  <th className="py-1">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id || index} className="border-b">
                    <td className="py-1">{item.title}</td>
                    <td className="py-1">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No items found.</p>
          )}
        </div>

        <a
          href="/"
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-indigo-700 text-center block"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
