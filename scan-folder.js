const fs = require('fs');
const path = require('path');
const readBlob = require('./read-blob');

module.exports = (source)=>{
    const result = {
        items: [],
        levelMap: new Map()
    }

    const doScan = (inputSource, parentItem)=>{
        const list = fs.readdirSync(inputSource);
        list.forEach(name=>{
            const itemPath = path.join(inputSource, name);
            const level = itemPath.split(path.sep).length;
            const stat = fs.statSync(itemPath);
            //console.log(item.isFile());
            const item = {
                'stat': stat,
                'path': itemPath,
                'isFile': stat.isFile(),
                'isDir': stat.isDirectory(),
                'level': level,
                'parent': parentItem,
                'children': []
            }

            if (parentItem){
                parentItem.children.push(item);
            }

            result.items.push(item);
            if (result.levelMap.has(level)){
                result.levelMap.get(level).push(item);
            }
            else {
                result.levelMap.set(level, []);
            }
            
            if (item.isDir){
                doScan(itemPath, item);
            }
            else if (item.isFile){

            }
        })
    }
    doScan(source);

    const levels = Array.from(result.levelMap.keys());
    

    levels.sort((a,b)=>a < b);
    console.log('levels', levels);
    levels.forEach(level=>{
        const levelItems = result.levelMap.get(level);
        levelItems.forEach(theItem=>{
            if (theItem.isFile){
                const blob = readBlob(theItem.path);
                theItem['blob'] = blob;

                //console.log(blob);
            }
        })
        //console.log(levelItems.length, levelItems[0]);
    })
    return result;
}