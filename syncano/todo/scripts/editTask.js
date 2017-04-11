import { data, response } from 'syncano-server';

const body = Object.assign({}, ARGS);
delete body.id;

data.tasks
  .update(ARGS.id, body)
  .then((task) => response(JSON.stringify(task), 200, 'application/json'))
  .catch((error) => response(JSON.stringify(error), 400, 'application/json'));
