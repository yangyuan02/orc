import { createWorker } from 'tesseract.js';
// import sharp from 'sharp';

(async () => {
    // 设置语言模型,如果语音模型本地不存在,则会自动下载
    const worker = await createWorker('jpn', 3, {
        langPath:'./jpn.traineddata',
        logger: m => {
            console.log(`progress :`,m.progress)
        },
    });
    try {
        const imgUrl = './ocr/sample3.png';
        // const imageData = await sharp(imgUrl).rotate().threshold(128).toBuffer()
        await worker.loadLanguage('jpn');  // 加载日语模型
        await worker.reinitialize('jpn');
        const ret = await worker.recognize(imgUrl, 'jpn');
        console.log(ret.data.text);
    } catch (error) {
        console.error('Error during OCR recognition:', error);
    } finally {
        await worker.terminate();
    }
})()