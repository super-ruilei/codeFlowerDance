/*
    let input = {
      originPoster: {
        size: {
          width: 900,
          height: 500,
        },
        regions: [
          { x: 32, y: 283, width: 531, height: 89 ,orientation:vertical},
          { x: 43, y: 255, width: 512, height: 32 ,orientation:vertical},
          { x: 43, y: 375, width: 519, height: 97 ,orientation:vertical}
        ]
      },
      newSize: {
        width: 1900,
        height: 1500,
      }
    };
    let k = 1;
    let output = {
      size: {
        width: 1900,
        height: 1500,
      },
      regions: [
        { x: 32, y: 849, width: 531, height: 267 },
        { x: 43, y: 765, width: 512, height: 96 },
        { x: 43, y: 1125, width: 519, height: 291 }
      ]
    }
*/

/* 
  c = newSize.height / size.height
  x' = x
  y' = y * c
  regions.width' = size.width
  regions.height' = size.height * c 
*/
//ch = newSize.height / size.height
//cv = newSize.weight / size.weight

//variance = 1/numPlanes, mean = planes
//let distribution = gaussian(mean, variance);
//sgn = sign(y,mean)
//force = distribution(y)*sgn;

//Force = sum(force)
//alpha = k*Force
//finalPlane = plane*(distortion + alpha)
import gaussian from './gaussian';
var handleInput2 = function (input, k,adjustW) {
    let planes = [];
    console.log("-----" + input.originPoster.regions[1].height);
    console.log("-----" + input.originPoster.regions[1].width);
    console.log("-----" + input.originPoster.regions[1].x);
    console.log("-----" + input.originPoster.regions[1].y);
    //get planes positions(just consider vertical orientation)
    //这里需要考虑方向--应该加上下左右哪个边进行考虑
    let oritDetail = getPara(input, input.newSize, input.originPoster.size);
    console.log(oritDetail);
    console.log("-----" + input.originPoster.regions[1].height);
    var am = [];
    var sigma = [];
    var labels = [];
    let finalRegions = [];
    //如果是vetical 方向拉长，则对平面p的y坐标和对应的height进行distortion的调整
    //如果是horizontal方向拉长，则对平面的x坐标和对应的width进行distortion的调整
    //如果equal，则do nothing，这里有个问题，因为1：1情况下，本图片也认为是非平稳系统，所以即使1：1变换会出现拉伸
    //这是因为认为object平面也存在力的关系，so为了处理这种“不合理”的情况，加入beta倍的振幅调整，应该可以处理
    //那对于与distortion方向垂直情况的object呢？同样可以这样处理，因为其方差特别大+振幅特别小，其实可以统一处理的
    //但是为了更快得到效果，需要单独对其进行处理。
    if (oritDetail.orit == 'vertical') {
        console.log("the orientation of strech is vertical");
        for (var i = 0; i < input.originPoster.regions.length; i++) {
            planes[i] = input.originPoster.regions[i].y + input.originPoster.regions[i].height / 2;
            planes[i] = planes[i] / input.originPoster.size.height;
            labels[i] = (input.originPoster.regions[i].orientation == 'horizontal');
            am[i] = input.originPoster.regions[i].width / input.originPoster.size.width;
            sigma[i] = input.originPoster.regions[i].height / input.originPoster.size.height;

        }
        planes.push(0); planes.push(1);
        labels.push(true); labels.push(true);
        am.push(1); am.push(1);
        sigma.push(1 / planes.length); sigma.push(1 / planes.length);
        console.log("planes:" + planes + "labels" + labels + "am" + am + "sigma" + sigma);
        finalRegions = handleClass(input, k, adjustW,{ planes, labels, sigma, am });
    } else if (oritDetail.orit == 'horizontal') {
        console.log("the orientation of strech is horizontal");
        for (var i = 0; i < input.originPoster.regions.length; i++) {
            planes[i] = input.originPoster.regions[i].x + input.originPoster.regions[i].width / 2;
            planes[i] = planes[i] / input.originPoster.size.width;
            labels[i] = (input.originPoster.regions[i].orientation == 'vertical');
            am[i] = input.originPoster.regions[i].height / input.originPoster.size.height;
            sigma[i] = input.originPoster.regions[i].width / input.originPoster.size.width;

        }
        planes.push(0); planes.push(1);
        labels.push(true); labels.push(true);
        am.push(1); am.push(1);
        sigma.push(1 / planes.length); sigma.push(1 / planes.length);

        finalRegions = handleClass(input, k,adjustW, { planes, labels, sigma, am });
    } else {
        //do nothing,directly 
        let c = oritDetail.amplify;
        let size = newSize;
        finalRegions = originPoster.regions.map(({ x, y, width, height }) => {
            return {
                x: x * c,
                width: width * c,
                y: y * c,
                height: height * c
            }
        });
        // note: x[0] = regions[0]['x'] or regions[0].x

    }
    //finalRegions = input.originPoster.regions;

    return {
        regions:finalRegions.result,
        size: input.newSize
    };
};




var handleClass = function (input, k,adjustW, { planes, labels, sigma, am }) {
    /*variance = 1/numPlanes, mean = planes
    //let distribution = gaussian(mean, variance);
    //sgn = sign(y,mean)
    //force = distribution(y)*sgn;
    //Force = sum(force)
    //alpha = k*Force
    //finalPlane = plane*(distortion + alpha)*/
    console.log("------funhandleClass-" + input.originPoster.regions.height);
    let variance = 1 / planes.length;
    //计算每个平面的最终位置
    var force = [];
    let sign;
    for (var i = 0; i < planes.length; i++) {
        //假设每个i为每个平面，此过程为了得到i对于每个其他平面j的影响力force
        force[i] = [];

        if (labels[i] == true) {
            let distribution = gaussian(planes[i], variance);
            //此循环为了每个j平面的被影响程度
            for (var j = 0; j < planes.length; j++) {
                sign = sgn(planes[i], planes[j]);
                //此处可以调节am来控制edge和object的影响力
                force[i][j] = am[i] * sign * distribution.pdf(planes[j]);
                //force[i][j] = sign * distribution.pdf(planes[j]);
            }
        } else {
            for (var j = 0; j < planes.length; j++) {
                force[i][j] = 0;
            }
        }
    }
    console.log("force \n" + force);
    var Force = [];
    for (var i = 0; i < planes.length; i++) {
        Force[i] = 0;
        for (var j = 0; j < planes.length; j++) {
            Force[i] = Force[i] + force[j][i];
        }
    }
    console.log("Force = " + Force);
    var finalPlane = [];
    var comparePlan = [];
    //k = 0.1;
    let oritDetail = getPara(input, input.newSize, input.originPoster.size);
    console.log("------funHandleCLASS----" + input.originPoster.regions.height);
    for (var i = 0; i < planes.length; i++) {
        if (labels[i] == true) {
            finalPlane[i] = (k * Force[i] + oritDetail.distortion) * planes[i];
        }
        else {
            finalPlane[i] = oritDetail.distortion * planes[i];
        }
    }
    console.log("------funHandleCLASS----" + input.originPoster.regions.height);
    console.log("planes" + planes);
    console.log("finalPlanes" + finalPlane);
    let norm = oritDetail.distortion / Math.max.apply(null, finalPlane);

    for (var i = 0; i < planes.length; i++) {
        finalPlane[i] = finalPlane[i] * norm;
        comparePlan[i] = planes[i] * oritDetail.distortion;
    }

    //console.log("planes" + planes);
    //console.log("finalPlanes" + finalPlane);
    //console.log("comparePlan" + comparePlan);
    //console.log("originPoster regions" + input.originPoster.regions);
    let result;
    var regionsIn = [...input.originPoster.regions];
    var regionsOut = [...regionsIn];
    //console.log('regionsOut' + regionsOut);
    //console.log("regionsIn" + regionsIn);
    //console.log("------funHandleCLASS----" + input.originPoster.regions.height);
    if (oritDetail.orit == 'vertical') {
        for (var i = 0; i < regionsIn.length; i++) {
            //console.log("oritDetail.amplify" + oritDetail.amplify);
            //console.log("width" + regionsIn[i].height + oritDetail.distortion);
            regionsOut[i].width = regionsIn[i].width * oritDetail.amplify;
            regionsOut[i].height = regionsIn[i].height * oritDetail.distortion * oritDetail.amplify*adjustW;

            regionsOut[i].x = regionsIn[i].x * oritDetail.amplify;
            regionsOut[i].y = finalPlane[i] * input.originPoster.size.height * oritDetail.amplify - regionsOut[i].height *adjustW/ 2;
            console.log("regionOut[" + i + "]" + regionsOut[i].x + "\n" +
                regionsOut[i].y + '\n' +
                regionsOut[i].width + "\n" +
                regionsOut[i].height + '\n'
            );
        }
        //console.log("regionsOut" + regionsOut);
        // for (let key in regionsOut){
        //     console.log(regionsOut[key]);
        // }

        result = {
            regions: regionsOut//,
            //size: input.newSize
        }
        console.log('resutl', JSON.stringify(result, null, 2))

    } else {
        for (var i = 0; i < regionsIn.length; i++) {

            regionsOut[i].height = regionsIn[i].height * oritDetail.amplify;
            regionsOut[i].width = regionsIn[i].width * oritDetail.distortion * oritDetail.amplify*adjustW;

            regionsOut[i].y = regionsIn[i].y * oritDetail.amplify;
            regionsOut[i].x = finalPlane[i] * input.originPoster.size.width * oritDetail.amplify - regionsOut[i].width*adjustW / 2;
            console.log("regionOut[" + i + "]" + regionsOut[i].x + "\n" +
                regionsOut[i].y + '\n' +
                regionsOut[i].width + "\n" +
                regionsOut[i].height + '\n'
            );
        }

        //for (let key in regionsOut){
        //   console.log(regionsOut[key]);
        //}
        result = {
            regions: regionsOut//
            //size: input.newSize
        }
        console.log('resutl', JSON.stringify(result, null, 2))
        //console.log("regionsOut" + regionsOut);
    }

    return {
        result
    };

};



var getPara = function (input, newSize, size) {
    //orit has three direction,'vertical''equal''horizontal'
    //for now we donot deal the oppsite direction text

    var amplify = 1;
    var distortion = 1;
    var orit = 'vertical';


    let ch = newSize.height / size.height;
    let cv = newSize.width / size.width;
    if (ch == cv) {
        amplify = ch;
        orit = 'equal'
        distortion = 1;

    } else if (ch > cv) {
        orit = 'vertical';
        amplify = cv;
        distortion = newSize.height / (size.height * amplify);
    } else {
        orit = 'horizontal';
        amplify = ch;
        distortion = newSize.width / (size.width * amplify);
    }


    let regions = input.originPoster.regions.map(({ x, y, width, height, orientation }) => {
        return {
            x,
            y,
            width,
            height,
            oritChange: orientation != orit
        }
    });

    return {
        amplify,
        orit,
        distortion,
        regions
    }
};
var sgn = function (coor, mu) {
    var sign = 0;
    if (coor > mu)
        sign = 1;
    else if (coor == mu)
        sign = 0;
    else
        sign = -1;
    return sign
};



export default handleInput2;