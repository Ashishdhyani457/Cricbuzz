require('chromedriver');
let wd=require("selenium-webdriver");
let browser=new wd.Builder().forBrowser('chrome').build();
let matchid=35612;
let innings=1;
let batsmanColumns=["PlayerName","out","runs","ballsPlayed","four","sixes","strikeRate"];
let bowlerColumns=["BowlerName","over","Maiden","Runs","Wicket","Noball","wideball","Economy"];
let inningsBatsmen=[];
let inningsbowler=[];
async function main(){
    await browser.get(`https://www.cricbuzz.com/live-cricket-scores/${matchid}`);
    await browser.wait(wd.until.elementLocated(wd.By.css(".cb-nav-bar a")));
    let buttons=await browser.findElements(wd.By.css(".cb-nav-bar a"));
    await buttons[1].click();
    await browser.wait(wd.until.elementLocated(wd.By.css(`#innings_${innings} .cb-col.cb-col-100.cb-ltst-wgt-hdr`)));
    let tables=await browser.findElements(wd.By.css(`#innings_${innings} .cb-col.cb-col-100.cb-ltst-wgt-hdr`));
    let inningsBatsmenRows=await tables[0].findElements(wd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));
    let inningsBowlersRows=await tables[1].findElements(wd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));
  for(let i=0;i<(inningsBatsmenRows.length);i++){
      let columns=await inningsBatsmenRows[i].findElements(wd.By.css("div"));
      if(columns.length==7){
      let data={};
      for(j in columns){
          if(j!=1){

              data[batsmanColumns[j]]=await columns[j].getAttribute("innerText");
          }
      }
      inningsBatsmen.push(data);
  }
}
  for(let i=0;i<(inningsBowlersRows.length);i++){
    let columns=await inningsBowlersRows[i].findElements(wd.By.css("div"));
    let data={};
    for(j in columns){

            data[bowlerColumns[j]]=await columns[j].getAttribute("innerText");
        
    }
    inningsbowler.push(data);
}

  console.log(inningsBatsmen);
  console.log(inningsbowler);
}
main();