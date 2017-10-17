//此方法可以针对区域进行分类
//0.33，0.66三等分
var handleInput3 = function ({ originPoster, newSize }, k) {
    let planes = []
    console.log("the orientation of strech is vertical");
    for (var i = 0; i < input.originPoster.regions.length; i++) {
        planes[i].y = input.originPoster.regions[i].y + input.originPoster.regions[i].height / 2;
        planes[i].y = planes[i].y / input.originPoster.size.height;
        planes[i].x = input.originPoster.regions[i].x + input.originPoster.regions[i].width / 2;
        planes[i].x = planes[i].x / input.originPoster.size.width;
    }
    

    

};

export default handleInput3;
