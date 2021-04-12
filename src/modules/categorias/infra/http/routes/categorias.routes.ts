import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CategoriasController from '../controllers/CategoriasController';
import CategoriasRecursiveController from '../controllers/CategoriasRecursiveController';

const categoriaRouter = Router();

const categoriasController = new CategoriasController();
const categoriasRecursiveController = new CategoriasRecursiveController();

categoriaRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      categoria_id: Joi.allow(),
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
      categoria_id: Joi.allow(),
    },
  }),
  categoriasController.update,
);
categoriaRouter.get('/', categoriasController.index);
categoriaRouter.get('/recursive', categoriasRecursiveController.index);

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
