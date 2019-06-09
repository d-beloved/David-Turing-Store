import { createTables } from './test_db_runner';

const migrate = () => {
  return createTables();
}

migrate();

export default migrate;
