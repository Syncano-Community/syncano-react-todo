import  { data, response } from 'syncano-server';

data.tasks
  .delete(ARGS.id)
  .then((task) => response(JSON.stringify(task), 200, 'application/json'))
  .catch((error) => response(JSON.stringify(error), 400, 'application/json'));
