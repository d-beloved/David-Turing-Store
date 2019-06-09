import models, { sequelize } from '../../src/models';

export const createTables = () => {
  return sequelize.sync({ force: true, logging: true });
};

const emptyTable = modelName => {
  return models[modelName].destroy({
    where: {},
    force: true,
    truncate: {
      cascade: true,
    },
    logging: false,
  });
};

export default async function truncate(model) {
  if (model) {
    return emptyTable(model);
  }

  return Promise.all(
    Object.keys(models).map(key => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return emptyTable(key);
    })
  );
}
