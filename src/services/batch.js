import TaskQueue from './TaskQueue';

const MAX_BATCH_CONCURRENCY = 5;

const limitConcurrency = con => {
  if (!con || typeof con !== 'number' || con < 1) {
    return MAX_BATCH_CONCURRENCY; // or 1
  }
  if (con > MAX_BATCH_CONCURRENCY) {
    return MAX_BATCH_CONCURRENCY;
  }
  return con;
};

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Send batch of requests in limited parallel sequence
const batch = concurrency => async (records, action, params) => {
  const queue = new TaskQueue(limitConcurrency(concurrency));

  await new Promise((resolve, reject) => {
    if (!records || records.length === 0) {
      resolve();
    }

    let completed = 0;
    const increment = () => {
      completed += 1;
      if (completed === records.length) {
        resolve();
      }
    };

    records.forEach(async record => {
      const task = () =>
        action(record, params)
          .then(() => increment())
          .catch(err => {
            console.error(err.message);
            increment();
            reject(err);
          });
      queue.pushTask(task);
    });
  });
};

export default batch;
