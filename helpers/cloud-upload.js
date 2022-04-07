async function uploadFileToGoogleCloud(
    {
        bucketName = process.env.GOOGLE_BUCKET_NAME,
        filePath,
        destFileName
    }
) {
    const { Storage } = require('@google-cloud/storage');

    const storage = new Storage({
        projectId: process.env.GOOGLE_PROJECT_ID,
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY
        }
    });

    let uploaded = false;
    async function uploadFile() {
        try {
            await storage.bucket(bucketName).upload(filePath, {
                destination: destFileName,
            });
            console.log(`${filePath} uploaded to ${bucketName}`);
            uploaded = true;
        } catch (error) {
            uploaded = false;
        }
    }

    await uploadFile();
    return uploaded;
}
