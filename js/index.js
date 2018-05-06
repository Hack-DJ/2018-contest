(function () {
'use strict';

/**
 * Created by Administrator on 2018/5/5.
 */
var tileList = [];
var game = function () {

    function listFormat() {
        for (var h = 0; h < 4; h++) {
            tileList[h] = [];
            for (var l = 0; l < 4; l++) {
                tileList[h].push(0);
            }
        }
    }

    listFormat();
    console.log(tileList);
};

/**
 * Created by Administrator on 2018/5/5.
 */
console.log(game());

}());
