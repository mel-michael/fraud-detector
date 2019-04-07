import { Router } from 'express';
import { controller } from './transaction.controller';

let router = Router();

router.route('/').get(controller.get)

export const transactionRouter = router;
