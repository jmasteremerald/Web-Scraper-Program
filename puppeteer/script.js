const puppeteer = require('puppeteer')
const files = require('fs/promises');


async function getData(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // go to the page with mens shirts and scrap all image src's/store in an array 
    await page.goto("https://www.amazon.com/s?k=mens+shirts&crid=220V7GN5CNT9M&sprefix=mens+shirt%2Caps%2C282&ref=nb_sb_noss_2");
    const menShirtLinks = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('img')).map(e => e.src);
    });
    const menShirtLinksColors= await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('img')).map(e => e.getAttribute('srcset'));
    });
    //write out image src to files 
    await files.writeFile("mensShirts.txt", menShirtLinks.join("\b\n"));
    await files.writeFile("testFile.txt", menShirtLinksColors.join("\b\n"));
    
    await page.goto("https://www.amazon.com/s?k=womens+shirts&crid=26K61VM6K3MJN&sprefix=womens+shi%2Caps%2C321&ref=nb_sb_noss_2");
    const womenShirtLinks = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('img')).map(e => e.src);
    });
    //write out image src to files 
    await files.writeFile("womenShirts.txt", womenShirtLinks.join("\b\n"));

    await page.goto("https://www.amazon.com/s?k=womens+bottoms+dressy+casual&sprefix=womens+bottoms%2Caps%2C224&ref=nb_sb_ss_ts-doa-p_1_14");
    const womenBottomWearLinks = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('img')).map(e => e.src);
    });
    //write out image src to files 
    await files.writeFile("womenBottomWear.txt", womenBottomWearLinks.join("\b\n"));

    await page.goto("https://www.amazon.com/s?k=mens+bottoms&crid=D7BT8O4RV7XZ&sprefix=mens+bottoms+d%2Caps%2C314&ref=nb_sb_noss_2");
    const menBottomWearLinks = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('img')).map(e => e.src);
    });
    //write out image src to files 
    await files.writeFile("menBottomWear.txt", menBottomWearLinks.join("\b\n"));

    await page.goto("https://www.nike.com/w/shoes-y7ok?cp=39014910465_search_%7cnike%20shoes%7c19639497576%7c148805191194%7ce%7cc%7c%7c%7c649156754058&gclid=Cj0KCQjwu-KiBhCsARIsAPztUF2RJZQ9CfJFqc8w7V8HlC8fDtyOG6iHhuNONlTAUH_3Va1YPw-YlDgaAmWAEALw_wcB&gclsrc=aw.ds");
    const shoes = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('img')).map(e => e.src);
    });
    //write out image src to files 
    await files.writeFile("shoes.txt", shoes.join("\b\n"));

    await browser.close();
}
getData()