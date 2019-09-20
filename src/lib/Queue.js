import Bee from 'bee-queue';
import SubscriptionMail from '../app/jobs/SubscriptionMail';
import redisConfig from '../config/redis';

// Todo novo job deve ser adicionado ao vetor
const jobs = [SubscriptionMail];

class Queue {
  constructor() {
    // Cada serviço tem uma fila própria;
    this.queues = {};

    this.init();
  }

  init() {
    // Desestruturamos para acessar mais rápido key e handle
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.process(handle);
    });
  }
}

export default new Queue();
