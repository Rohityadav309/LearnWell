// check if demo user
export const isDemo = async (req, res, next) => {
  try {
    const { email } = req.user;

    console.log(email);

    const demoEmails = [
      "kumarhimanshusangwan@gmail.com",
      "1234@gmail.com",
    ];

    if (demoEmails.includes(email)) {
      return res.status(401).json({
        success: false,
        message: "This is a Demo User",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error checking for demo user",
    });
  }
};
