import { NextApiRequest, NextApiResponse } from "next"
import { DOMAIN, PORTFOLIO_SERVICE_DOMAIN } from "../variables";
import { Files, Formidable } from "formidable";
import { readFileSync } from "fs";

export const config = {
  api: {
    bodyParser: false
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
  
    const formData: FormData = await new Promise((resolve, reject) => {
      /*
      ⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⠀⠀⠀
⢰⡿⠋⠙⠦⣄⡀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡋⠀⠀⢳⣄⠀
⠸⣧⠀⠀⠀⠈⣷⣤⣤⠛⠋⠛⣦⠀⠀⠀⠀⠀⠀⠀⣀⠀⢀⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣷⡄⠀⠀⠛⡆
⠀⠙⣷⠀⠀⠀⠀⠀⡇⠀⠀⣴⠛⠀⠀⠀⠀⠀⣠⣴⡿⠓⠛⠛⢿⣟⠒⢤⣄⠀⠀⠀⠀⢾⡏⠀⠈⢿⣿⠃⠀⠠⠀⢸
⠀⠀⢸⡄⠀⠀⠚⠋⠁⠀⣼⠁⠀⠀⠀⢀⡴⠛⠛⣋⣤⣄⠀⠠⠤⢤⣀⠀⠈⠳⢦⡀⠀⠈⢳⡀⠀⣾⠃⠀⣀⡀⠀⢺
⠀⠀⠀⢿⡀⠀⠀⠀⡀⠀⣿⠀⠀⠀⣴⠋⠡⠂⠉⠀⠀⠀⣀⣀⡀⠀⠉⠙⠀⠀⠈⠱⣆⠀⢸⡇⢀⠀⠀⠠⠋⠁⢀⡿
⠀⠀⠀⠈⢧⡀⠀⠀⠈⣰⠏⠀⠀⡾⠁⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠙⡆⠸⣦⡀⠀⠀⠀⢀⣠⠟⠁
⠀⠀⠀⠀⠀⠙⢦⣤⣴⠟⠀⠀⣸⠁⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⢿⡄⠈⠻⣦⣤⠾⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⢸⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⣾⣿⣿⣿⡿⠟⠛⠛⠿⣿⣿⣿⣿⣷⡀⠀⠀⢸⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⡄⠀⣸⣿⣿⡿⠋⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣇⠀⠀⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⠀⢻⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⠀⣴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⢀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠶⣄⡀⠀⠀⠀⠀⠀⠀⠀⣠⣴⠞⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
       */
      const form = new Formidable();

      form.parse(req, (err, fields, files: Files<string>) => {
        if (err) reject({ err })
        const formData = new FormData();

        Object.keys(fields).forEach(key => {
          // I don't know why a field is an array 
          let field = fields[key]
          if (field && field.length > 0) {
            formData.append(key, field[0])
          }
        })

        Object.keys(files).forEach(key => {
          let fileList = files[key]
          if (fileList) {
            fileList.forEach((file) => {
              let fileBuffer = readFileSync(file.filepath)
              let fileBlob = new File([fileBuffer], file.originalFilename? file.originalFilename : 'whatever.txt', { type: file.mimetype?.toString() })
              formData.append(`${key}`, fileBlob,)
            })
          }
        })
        resolve(formData);
      }) 
    })

    let response = await fetch(`${PORTFOLIO_SERVICE_DOMAIN}/portfolio/projects/create`, {
      method: "POST",
      headers: {
        'Authorization': req.headers['authorization'] as string
      },
      body: formData
    })
    
    console.log(response);
    res.status(response.status).send(response.body);
  }
}