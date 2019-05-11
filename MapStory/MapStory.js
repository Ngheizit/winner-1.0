var timing = [
	[[12599107.01194563,2646708.541402513],[14],null, '1999年4月14号；我在这片繁华的地方出世了；你好世界，我叫吴希浙'],
	[[12598632.135710578,2646860.8182948],[18],null,'这里是我的第一个家；那时，东边还是一片草地'],
	[[12598495.385089666,2647108.641472443],[19],elastic,'我忘了我是什么时候上幼儿园的，不过这所学校承载了我的幼儿园、学前班和小学阶段，这所学校叫六联小学'],
	[[12598637.276921833,2646968.307865826],[19],elastic,'大概在二年级的时候，由于某种原因，第一个家被出租出去了，这时，婆婆家成了第二个家'],
	[[12599435.08840456,2646873.0601626104],[18],elastic,'没过多久，这里成了我的第三个家'],
	[[12597976.915861921,2647046.5363869616],[17],bounce,'小学期间，由于非常调皮，每周末，我都会被妈咪带到她的工厂做作业，虽然很不情愿，但是期间认识了一位同班的小女孩，不过现在我只知道她的名字，叫杜晓楠'],
	[[12598496.644733077,2647102.96841175],[19],null,'2011年6月份，我从这所学校毕业了；这所学校给了我一个好朋友，一直到现在依旧，他的名字叫黄伟鸿'],
	[[12598956.265286822,2646966.516372975],[18],null,'虽说隔壁有一所在这片区域鼎鼎有名的初中，它的名字叫石门实验中学，但我也只能望尘莫及，它的高中部也是'],
	[[12599549.8465846,2645257.4321936616],[18],bounce,'2011年9月份，作为刚称为初中生的我，来到了这所学校，它的名字叫黄岐初级中学，初中三年，它只带给了我很少的回忆'],
	[[12580865.77048314,2612668.982915703],[18],true,'2013年暑天，我从黄岐初级中学毕业，来到了着说高中，它的名字叫南海九江中学；对当时的我来说，这是一所离家很远的学校，从家到学校的距离，挤公交需要两个小时；这所学校带给了我很多回忆，比如说它让我热爱上了地理，其实更真切地说，是冬菇让我热爱上了地理'],
	[[12577089.863395944,2609283.0614283835],[14],bounce,'这所学校的西南边，西江奔流而过，江上有一块很美丽的江心沙，它的名字叫海寿岛'],
	[[12580864.576154573,2612676.1488871053],[17],null,'2017年暑天，我从这所学校毕业了，让我没想到的是'],
	[[12747744.262570245,4578964.956737751],[18],true,'我的大学竟然离开的广东省，跨越大半个中国，来到了真正的北方，河北，它的名字叫河北师范大学']
];

// 反弹缓冲方法
function bounce(t){
	var s = 7.5625;
	var p = 2.75;
	var l;
	if(t < (1 / p)){
		l = s * t * t;
	}else{
		if(t < (2 / p)){
			t -= (1.5 / p);
			l = s * t * t + 0.75;
		}else{
			if (t < (2.5 / p)){
				t -= (2.25 / p);
				l = s * t * t + 0.9375;
			}else{
				t -= (2.625 / p);
				l = s * t * t + 0.984375;
			}
		}
	}
	return l;
}

// 弹性缓冲方法
function elastic(t){
	return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
}
function flyTo(location, d, z, done) {
	var duration = d;
	var zoom = view.getZoom();
	var parts = 2;
	var called = false;
	function callback(complete) {
	  	--parts;
	  	if (called) {
	  	  return;
	  	}
	  	if (parts === 0 || !complete) {
	  	  called = true;
	  	  done(complete);
	  	}
	}
	view.animate({
	  	center: location,
	  	duration: duration
	}, callback);
	view.animate({
	  	zoom: zoom - z,
	  	duration: duration / 2
	}, {
	 	zoom: zoom,
	 	duration: duration / 2
	}, callback);
}


	/*
	 * 加载Bing地图
	 */
//	var Map = ol.Map;
var View = ol.View;
var TileLayer = ol.layer.Tile;
var BingMaps = ol.source.BingMaps;
var Overlay = ol.Overlay;
var TileJSON = ol.source.TileJSON;

/*
 * 构成弹出窗体的要素       Elements that make up the popup.
 */
//1. 容器
var container = document.getElementById('popup');
//2. 内容
var contentP = document.getElementById('popup-content');
//3. 关闭
var closer = document.getElementById('popup-closer');
/*
 * 创建叠加层以将弹出窗口锚定到地图        Create an overlay to anchor the popup to the map.
 */
// 相当于一个地图元素（Element）变量
var overlay = new Overlay({
	element: container,  //变量的载体（容器）   当把其加载到地图叠加层后，该标签就会被隐藏起来
	autoPan: true,   //开启自动平移？？？
	autoPanAnimation: {  //自动平移动画？？？
		duration: 250	  //动画属性：持续事件？？？
	}
});
/*
 * 添加单击处理程序以隐藏弹出窗口。 (相当于关闭)
 * return {boolean}  返回布尔值  不要关注href。
 */
closer.onclick = function(){
	overlay.setPosition(undefined);
	closer.blur();   //从元素中移除焦点？？？
	return false;
};

var view = new View({
  	center: [12558297.999141319,4148390.399093085],
  	zoom: 4
});

var map = new ol.Map({
	target: 'map',
	loadTilesWhileInteracting: true,
	layers: [
		new TileLayer({
			preload: Infinity,
			source: new BingMaps({
				key: 'ArEV_-vJI10eENxibC2QlOtItvfxy0z_o9Y1fzwMuvkGWominJ4zlZSR6iAV02wE',
				imagerySet:'Aerial',
				crossOrigin: 'anonymous'
			})
		})
	],
	overlays: [overlay],
    view: view
});
/*
 * 向地图添加单击处理程序以呈现弹出窗口      Add a click handler to the map to render the popup
 */
map.on('singleclick', function(evt){
	var coordinate = evt.coordinate;
	contentP.innerHTML = '<p>You click here:</p><code>' + coordinate +'</code>';
	overlay.setPosition(coordinate);
});

//获取开始按钮
var btn_begin = document.getElementById('btn_begin');

$(document).ready(function(){
  	$("#btn_begin").click(function(){
  		var left = $('#screen_left');
		var right = $('#screen_right');
		var btn = $('#btn_begin');
    	left.animate({width:'0'}, 3000);
    	right.animate({height:'0'}, 3000);
  	});
});
btn_begin.onclick = function(){
    view.animate({
		center: [12618301.06634518,2739503.093740717],
		duration: 4000,
		zoom: 6
	});
    storyText.innerText = '这里是中国的南方，其中的广东省，是我的家乡，那里很美，有川流不息的珠江流域、有繁荣发达的珠三角城市群，也有绵延不断的海岸线。我很幸运。'
    $("#showstory").slideDown(4000);
    btn_begin.parentNode.removeChild(btn_begin);
    var next = document.createElement('button');
	next.id = 'next';
	next.style.position = 'absolute';
	next.style.width = '18%';
	next.style.height = '60px'
	next.style.backgroundColor = 'white';
	next.style.top = '90%';
	next.style.left = '42%';
	next.innerText = '<<🚶‍♂️🏃‍♂️🏃‍♂️🏃‍♀️🚶‍♂️<<'
	next.style.fontSize = '25px';
	next.style.opacity = '0.7';
	next.style.transform = 'rotateY(180deg)'
	content.appendChild(next);
	next.onclick = function(){
		$("#showstory").slideUp();
		if(count < timing.length){
			if(timing[count][2] == null){
				view.animate({
					center: timing[count][0],
					duration: 4000,
					zoom: timing[count][1]
				});
			}else if(timing[count][2] == true){
				if(count == 9)
					flyTo(timing[count][0], 8000, 5, function() {});
				if(count == 12)
					flyTo(timing[count][0], 14000, 12, function() {});
			}else{
					view.animate({
					center: timing[count][0],
					duration: 4000,
					zoom: timing[count][1],
					easing: timing[count][2]
				});
			}
			storyText.innerText = timing[count][3];
			count++;
			$("#showstory").slideDown(3000);
		}else{
			alert('故事未完待续...');
		}
	}
}

var center = document.getElementById('header');



var count = 0
var showBox = document.createElement('div');
showBox.id = 'showstory';
showBox.style.position = 'absolute';
showBox.style.width = '50%';
//showBox.style.height = '100px'
showBox.style.backgroundColor = 'white';
showBox.style.top = '0';
showBox.style.left = '25%';
showBox.style.display = 'none';
showBox.style.borderBottom = '5px solid black'
//showBox.style.borderTop = '10px solid black'
showBox.style.opacity = '0.8';
var content = document.getElementById('content');
content.appendChild(showBox)
var storyText = document.createElement('div')
storyText.id = 'storytext';
storyText.style.margin = '10px';
storyText.style.fontFamily = '仿宋'
storyText.style.fontSize = '20px';
storyText.style.fontWeight = 'bold';
storyText.style.color = 'black';
storyText.style.textShadow = '0 0 6px black';
storyText.style.textIndent = '2em';
showBox.appendChild(storyText);


//	text-align: center;
//	font-size: 72px;
//	color: white;
//	text-shadow: 0 0 6px black;





