var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function () {

    return axios.get("https://www.nytimes.com").then(function(res) {

        var $ = cheerio.load(res.data);

        var articles = [];

        $(".assetWrapper").each(function(i, element){

            var head = $(this).find("h2").text().trim();
            var sum = $(this).find("p").text().trim();

            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        });
        return articles;
    });
};

module.exports = scrape;