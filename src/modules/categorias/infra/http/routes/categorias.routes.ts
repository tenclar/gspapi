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
      slug: Joi.string().required(),
      categoria_id: Joi.string().required(),
    },
  }),
  categoriasController.create,
);

categoriaRouter.get('/', categoriasController.index);

export default categoriaRouter;
