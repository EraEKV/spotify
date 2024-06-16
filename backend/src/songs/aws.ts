// import { S3 } from "aws-sdk";

// // Import other necessary modules

// // Configure the AWS SDK with your AWS credentials
// const s3 = new S3({
//     accessKeyId: "YOUR_AWS_ACCESS_KEY_ID",
//     secretAccessKey: "YOUR_AWS_SECRET_ACCESS_KEY",
// });

// // Create song
// songRouter.post("/", authMiddleware, async (req, res) => {
//     const { user } = req;
//     const songFile = req.files.song; // Assuming you are using a file upload library like multer

//     // Upload the song file to the cloud storage
//     const uploadParams = {
//         Bucket: "YOUR_BUCKET_NAME",
//         Key: `songs/${songFile.name}`,
//         Body: songFile.data,
//     };

//     const uploadResult = await s3.upload(uploadParams).promise();

//     // Save the href to the database
//     const song = await Song({
//         ...req.body,
//         uploadedBy: (user as any)._id,
//         href: uploadResult.Location, // Assuming the cloud storage library returns the file URL as `Location`
//     }).save();

//     res.status(201).send({ data: song, message: "Song created successfully" });
// });
