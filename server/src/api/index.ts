import { Router } from 'express';
import { transactionRouter } from './transaction/transaction.router';

let router = Router();
router.use('/transactions', transactionRouter);

export const apiRouter = router;

