
// 一会 调用的时候 
/**
 * jq 找到 需要使用 瀑布流布局的 父元素
 * 需要瀑布流排布的子元素 必须 添加 item class
 * $('.items').waterfall();
 */
(function ($) {
    $.fn.extend({
        waterfall: function () {
            // this 这个关键字 在用的时候 非常容易产生歧义
            // 建议 起一个别名
            var $_this = this;

            //  总宽度
            var totalWidth =  $_this.width();
            //  子元素的宽度
            var eachWidth = $_this.children('.item').width();
            // 计算列数  5.7 
            var columnNum = Math.floor(totalWidth / eachWidth);

            var margin = (totalWidth - columnNum * eachWidth) / (columnNum + 1);
            // console.log(margin);

            // 准备高度数组
            var heightArr = [];

            // 循环 赋初始值
            for (var i = 0; i < columnNum; i++) {

                heightArr[i] = margin;
            }

         $_this.children('.item').each(function (index, element) {
                //  console.log(a+'|'+b);
                // element 是dom元素

                // 判断 高度数组中 的 最小值
                var minIndex = 0;
                var minHeight = heightArr[minIndex];
                for (var i = 0; i < heightArr.length; i++) {
                    if (heightArr[i] < minHeight) {
                        // 获取最小的
                        minIndex = i;
                        minHeight = heightArr[i];
                    }
                }
                // 到这 最小的高度 以及 最小的 索引值
                $(element).css({
                    top: minHeight,
                    left: margin + (margin + eachWidth) * minIndex
                })

                // 更新 高度 数组
                heightArr[minIndex] += $(element).height() + margin;

            })

            var maxIndex = 0;
            var maxHeight = heightArr[maxIndex];
            for (var i = 0; i < heightArr.length; i++) {
                if (heightArr[i] > maxHeight) {
                    maxHeight = heightArr[i];
                    maxIndex = i;
                }
            }
            // 最大值
          $_this.height(maxHeight + margin);

            // 为了 能够链式编程
            return $_this;
        }
    })
})($)
