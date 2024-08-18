import { NextApiRequest, NextApiResponse } from "next"
import { DOMAIN, PORTFOLIO_SERVICE_DOMAIN } from "../variables"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    fetch(`${PORTFOLIO_SERVICE_DOMAIN}/portfolio/projects`).then(response => 
      response.json()
    ).then(data => {
      res.status(200).json(data)
    })
  }
}