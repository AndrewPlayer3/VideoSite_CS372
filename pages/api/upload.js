import { promises as fs } from 'fs'
import { IncomingForm } from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  }
};

const save_file = async (file) => {
    try {
        const location = `/public/${file.originalFilename}`;
        const data = await fs.readFile(file.filepath);
        await fs.writeFile(location, data, { flag: 'w+' });
        await fs.unlink(file.filepath);
        return location;
    } catch(error) {
        console.log("Error: ", error.message);
        return "";
    }
};

export default async (req, res) => {
    if (req.method == "POST") {
        const data = await new Promise((resolve, reject) => {
            const form = new IncomingForm()
            
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err)
                resolve({ fields, files })
            })
        })

        const location = await save_file(data?.files.file)

        if (location !== "") {
            return res.status(200).send({"uploaded": true, location: location});
        } else {
            return res.status(500).send({"uploaded": false, location: ""});
        }
    }
}