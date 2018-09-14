const fs = require('fs');
const path = require('path');

module.exports = (source)=>{
    const result = {
        items: [],
        levelMap: new Map()
    }

    const doScan = (inputSource)=>{
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
                'level': level
            }

            result.items.push(item);
            result.levelMap.set(level, item);
            if (item.isDir){
                doScan(itemPath);
            }
            else if (item.isFile){

            }
        })
    }
    doScan(source);

    return result;
}