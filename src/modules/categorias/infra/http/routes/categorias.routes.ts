import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CategoriasController from '../controllers/CategoriasController';

const categoriaRouter = Router();

const categoriasController = new CategoriasController();

categoriaRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      categoria_id: Joi.string(),
    },
  }),
  categoriasController.create,
);
categoriaRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      categoria_id: Joi.string(),
    },
  }),
  categoriasController.update,
);
categoriaRouter.get('/', categoriasController.index);

categoriaRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  categoriasController.show,
);
export default categoriaRouter;
