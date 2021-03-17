import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SuperioresController from '../controllers/SuperioresController';

const superioresRouter = Router();

const superioresController = new SuperioresController();

superioresRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      status: Joi.boolean(),
    },
  }),
  superioresController.create,
);
superioresRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().required(),
    },
  }),
  superioresController.update,
);
superioresRouter.get('/', superioresController.index);

superioresRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  superioresController.show,
);
export default superioresRouter;
