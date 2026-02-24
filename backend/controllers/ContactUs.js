import mailSender from '../utils/mailSender.js';

export const contactUs = async (req, res) => {
  const { firstName, lastName, email, message, phoneNo } = req.body;

  if (!firstName || !email || !message) {
    return res.status(403).json({
      success: false,
      message: 'All fields are required',
    });
  }

  try {
    const data = {
      firstName,
      lastName: lastName ?? 'null',
      email,
      message,
      phoneNo: phoneNo ?? 'null',
    };

    const emailBody = `
      <html>
        <body>
          <h2>New Contact Form Submission</h2>
          ${Object.entries(data)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('')}
        </body>
      </html>
    `;

    const info = await mailSender(
      process.env.CONTACT_MAIL,
      'Enquiry from Contact Form',
      emailBody
    );

    if (info) {
      return res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to send email',
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while sending the message',
      error: error.message,
    });
  }
};
