const YoutubeVideoSubFileParser  = require('./app-back/services/YoutubeVideoSubFileParser');

const t = new YoutubeVideoSubFileParser();
async function parse() {
    await t.parse({
        path: './Opher Vishnia - Wait, you can do that with JavaScript…! _ JSConf Iceland 2018-JCATu2WkOq8.en.vtt',
        type: 1
    });
}
