import transporter from '../config/mailer.js';

const sendConfirmationEmail = async (to, orderDetails) => {
  try {
    
    await transporter.sendMail({
      from: '"QuickShop" <no-reply@quickshop.com>',
      to,
      subject: 'Order Confirmation',
      html: `<h2>Thank You for Your Purchase!</h2>
             <p>Order Details:</p>
             <ul>${orderDetails.items
               .map(item => `<li>${item.title} - ${item.quantity} x $${item.price}</li>`)
               .join('')}</ul>
             <p>Total: $${orderDetails.total}</p>`,
    });
    console.log(' Confirmation email sent to:', to);
  } catch (error) {
    console.error(' Error sending email:', error);
    throw error;
  }
};

export default sendConfirmationEmail;
