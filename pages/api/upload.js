import { promises as fs } from 'fs'
import { IncomingForm } from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  }
};

const save_file = async (file) => {
    try {
        const data = await fs.readFile(file.filepath);
        await fs.writeFile(`./public/${file.originalFilename}`, data, { flag: 'w+' });
        await fs.unlink(file.filepath);
        return true;
    } catch(error) {
        console.log("Error: ", error.message);
        return false;
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

        const isUploaded = await save_file(data?.files.file)

        return res.status(200).send({"uploaded": isUploaded});
    }
}