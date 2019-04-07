import { Request, Response } from 'express';

export let controller = {
	get: (req: Request, res: Response) => {
		let Connection = req.app.locals.connection;

		Connection.collection('transactions')
			.find({}).toArray()
			.then((data: any) => res.json(data))
			.catch((err: any) => res.json({ error: err }))
	}
};
