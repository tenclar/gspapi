import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import LocalController from '../controllers/LocalController';

const localRouter = Router();

const localController = new LocalController();

localRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
    },
  }),
  localController.create,
);
localRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      nome: Joi.string().required(),
    },
  }),
  localController.update,
);
localRouter.get('/', localController.index);

localRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  localController.show,
);
export default localRouter;
