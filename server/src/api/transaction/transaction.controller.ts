import { Request, Response, NextFunction } from 'express';

export let controller = {
	get: (req: Request, res: Response, next: NextFunction) => {
		let Connection = req.app.locals.connection;

		Connection.collection('transactions')
			.find({}).toArray()
			.then((data: any) => res.json(data))
			.catch((err: any) => res.json({ error: err }))
	},
	getById: (req: Request, res: Response, next: NextFunction) => {
		res.json({ ok: true });
	},
	post: (req: Request, res: Response, next: NextFunction) => {
		res.json({ ok: true });
	},
	put: (req: Request, res: Response, next: NextFunction) => {
		res.json({ ok: true });
	},
	delete: (req: Request, res: Response, next: NextFunction) => {
		res.json({ ok: true });
	},
};
