import { data, response } from 'syncano-server';

data.tasks
  .orderBy('created_at', 'DESC')
  .list()
  .then((tasks) => response(JSON.stringify(tasks), 200, 'application/json'))
  .catch((error) => response(JSON.stringify(error), 400, 'application/json'));
