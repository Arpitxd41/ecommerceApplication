// const fetchUserDetails = async (req, res) => {
//   try {
//     const authToken = req.headers.authorization;

//     if (!authToken) {
//       return res.status(401).json({
//         success: false,
//         message: 'Authorization token is missing',
//       });
//     }

//     const tokenParts = authToken.split(' ');
//     const token = tokenParts[1];
//     const decoded = jwtToken.verify(token, process.env.JWT_SECRET || 'default-secret-key');
//     const userId = decoded.userId;

//     const user = await userModel.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//     });
//   }
// };