/**
 * Created by Administrator on 2018/5/5.
 */
const boardSize = 4;
export default function () {
    // 初始化
    function listFormat() {
        let tileList = [];
        for (let h = 0; h < boardSize; h++) {
            tileList[h] = [];
            for (let l = 0; l < boardSize; l++) {
                tileList[h].push(0);
            }
        }
        return tileList;
    }

    // 开始游戏
    function start() {

    }

    // 随机生成2个空格

}


