const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const router = express.Router();
const url = 'https://maplestory.nexon.com';

router.get('/', async (req, res) => {
  const page = req.query.page || 1;

  try {
    const subUrl = '/N23Ranking/World/Total'
    const html = await axios.get(`${url}${subUrl}?page=${page}`);
    const $ = cheerio.load(html.data);
    const trElements = $('.rank_table_wrap > table > tbody > tr');
    const items = trElements
      .map((i, tr) => ({
      rank: page * 10 - 9 + i,
      name: $(tr).find('td:nth-child(2) > dl > dt > a').text(),
      level: $(tr).find('td:nth-child(3)').text(),
      job: $(tr).find('td:nth-child(2) > dl > dd').text(),
      exp: $(tr).find('td:nth-child(4)').text(),
      guild: $(tr).find('td:nth-child(6)').text(),
      image: $(tr).find('td:nth-child(2) > span > img').attr('src'),
      }))
      .toArray();
    res.send({ result: "success", data: items });
  } catch (error) {
    console.log(error)
    res.send({ result: "fail", error });
  }
});

module.exports = router;