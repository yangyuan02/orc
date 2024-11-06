import { createWorker } from 'tesseract.js';

(async () => {
    // 设置语言模型,如果语音模型本地不存在,则会自动下载
    const worker = await createWorker('jpn', 3, {
        logger: m => {
            console.log(`progress :`,m.progress)
        },
    });
    try {
        const imgUrl = './ocr/sample1-2.png';
        const ret = await worker.recognize(imgUrl, 'jpn');
        console.log(ret.data.text);
    } catch (error) {
        console.error('Error during OCR recognition:', error);
    } finally {
        await worker.terminate();
    }
})()