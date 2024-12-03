/**
 * スライダー、サムネイルにイベントを設定します
 */
window.addEventListener('load', (e) => {
	const slideDatas = {
		top : document.querySelector('.image_box img')
		, now : document.querySelector('.thumbnail img')
		, list : [...document.querySelectorAll('.thumbnail img')]
	};
	slideDatas.list.forEach(dom => dom.onclick = () => {
		slideDatas.now = dom;
		slideDatas.top.src = slideDatas.now.src;
	});
	slideDatas.top.src = slideDatas.now.src;
	document.querySelector('#prev').onclick = () => slideMoveClick(slideDatas, -1);
	document.querySelector('#next').onclick = () => slideMoveClick(slideDatas, 1);
});

/**
 * slide の prev, next を押下時の処理します
 * @param { {[key: String]: Object} } slideDatas スライダー画像情報
 * @param {Number} shift シフト値
 */
function slideMoveClick(slideDatas, shift) {
	slideDatas.now = slideDatas.list[(slideDatas.list.length + slideDatas.list.indexOf(slideDatas.now) + shift) % slideDatas.list.length];
	slideDatas.top.src = slideDatas.now.src;
	slideDatas.top.animate(
		{
			transform: ['translateX(' + (-30 * shift) + 'px)', 'translateX(0px)']
			, opacity: [0.2, 1]
		}
		, {
			duration: 500,
			iterations: 1
		}
	);
}