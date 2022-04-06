import { promises as fs } from 'fs'
import { IncomingForm } from 'formidable'

async function uploadFileToGoogleCloud(
    { bucketName = process.env.GOOGLE_BUCKET_NAME,
    filePath,
    destFileName }
) {
    // [START storage_upload_file]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The path to your file to upload
  // const filePath = 'path/to/your/file';

  // The new ID for your GCS file
  // const destFileName = 'your-new-file-name';

  // Imports the Google Cloud client library
  const { Storage} = require('@google-cloud/storage');

  let uploaded = false;

  // Creates a client
  const storage = new Storage({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY
      }
  });

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
  // [END storage_upload_file]
}

export const config = {
  api: {
    bodyParser: false,
  }
};

const save_file = async (file, type, id) => {
    try {
        const location    = `${type + "/" + id}`;
        const data        = await fs.readFile(file.filepath);
        const file_write  = await fs.writeFile(location, data, { flag: 'w+' });
        const unlink_file = await fs.unlink(file.filepath);
        return `${file.originalFilename}`;
    } catch(error) {
        console.log("Error: ", error.message);
        return "";
    }
};

export default async (req, res) => {

    const { vid } = req.query;

    if (req.method == "POST") {

        const user_res = await fetch('http://localhost:3000/api/user', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                cookie: req.headers.cookie,
            },
        });
        const user_data = await user_res.json();
        if (!user_data.role.content_editor) {
            return res.status(403).send('Only Content Editors can Upload Videos.');  
        }

        const data = await new Promise((resolve, reject) => {
            const form = new IncomingForm()
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err)
                resolve({ fields, files })
                console.log("FF: ", fields, files);
            })
        })

        const destFileName = data?.fields.type + '/' + vid + "." + data?.files.file.mimetype.split('/')[1];

        const uploaded = await uploadFileToGoogleCloud({filePath: data?.files.file.filepath, destFileName: destFileName});

        if (uploaded) {
            return res.status(200).send({"uploaded": true, location: destFileName});
        } else {
            return res.status(500).send({"uploaded": false, location: "" });
        }
    }
}