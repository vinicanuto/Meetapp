/** Processo isolado para processar as filas
 * Evita perca de performance no servidor da aplicação
 */
import Queue from './lib/Queue';

Queue.processQueue();
