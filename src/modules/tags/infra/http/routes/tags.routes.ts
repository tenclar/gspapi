import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import TagController from '../controllers/TagController';

const tagRouter = Router();

const tagController = new TagController();

tagRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      status: Joi.boolean(),
    },
  }),
  tagController.create,
);
tagRouter.put(
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
  tagController.update,
);
tagRouter.get('/', tagController.index);

tagRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  tagController.show,
);
export default tagRouter;
