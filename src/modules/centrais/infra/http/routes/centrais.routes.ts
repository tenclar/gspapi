import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CentraisController from '../controllers/CentraisController';

const centralRouter = Router();

const centraisController = new CentraisController();

centralRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      status: Joi.boolean().required(),
    },
  }),
  centraisController.create,
);
centralRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().required(),
      status: Joi.boolean().required(),
    },
  }),
  centraisController.update,
);
centralRouter.get('/', centraisController.index);

centralRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  centraisController.show,
);
export default centralRouter;
