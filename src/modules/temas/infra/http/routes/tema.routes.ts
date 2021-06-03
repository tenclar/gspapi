import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import TemaController from '../controllers/TemaController';

const temaRouter = Router();

const temaController = new TemaController();

temaRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      status: Joi.boolean(),
    },
  }),
  temaController.create,
);
temaRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().required(),
      status: Joi.boolean(),
    },
  }),
  temaController.update,
);
temaRouter.get('/', temaController.index);

temaRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  temaController.show,
);
export default temaRouter;
