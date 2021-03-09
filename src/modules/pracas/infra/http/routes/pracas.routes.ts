import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import PracasController from '../controllers/PracasController';

const pracaRouter = Router();

const pracasController = new PracasController();

pracaRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      status: Joi.boolean().required(),
    },
  }),
  pracasController.create,
);
pracaRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().required(),
    },
  }),
  pracasController.update,
);
pracaRouter.get('/', pracasController.index);

pracaRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  pracasController.show,
);
export default pracaRouter;
