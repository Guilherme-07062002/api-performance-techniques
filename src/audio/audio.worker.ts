import { parentPort, workerData } from 'worker_threads';

async function processAudio() {
    console.log('Processing job in worker thread...');

    // Simula uma requisição demorada
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log('Job processed');

    // Envia uma mensagem de volta para o processo pai
    parentPort?.postMessage({ status: 'completed', data: workerData.data });
}

processAudio();