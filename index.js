const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.commitstrip.com/en/page/';

async function getComicsLinks() {
  try {
    
    let comicLinks = [];

  
    for (let i = 0; i < 10; i++) {
      const comicUrl = `${BASE_URL}${i + 1}/`;
      comicLinks.push(comicUrl);
    }

   
    for (let i = 0; i < comicLinks.length; i++) {
      const url = comicLinks[i];
      const { data: comicData } = await axios.get(url);
      const comicPage = cheerio.load(comicData);
      const title = comicPage('#ctitle').text().trim();
      console.log(`${i + 1}. Title: ${title}, URL: ${url}`);
    }
  } catch (error) {
    console.error('Error fetching comic links:', error);
  }
}

getComicsLinks();
