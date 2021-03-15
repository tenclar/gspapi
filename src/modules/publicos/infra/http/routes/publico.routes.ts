import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import PublicoController from '../controllers/PublicoController';

const publicoRouter = Router();

const publicoController = new PublicoController();

publicoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      status: Joi.boolean(),
    },
  }),
  publicoController.create,
);
publicoRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().required(),
    },
  }),
  publicoController.update,
);
publicoRouter.get('/', publicoController.index);

publicoRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  publicoController.show,
);
export default publicoRouter;
