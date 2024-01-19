const teams = [
  {
    title: '出欠管理アプリ',
    menber: ['峰岸紘士', '磯邉佳鋳', '田中竜也'],
    id: 'yVRhyLFwvtU',
  },
  {
    title: 'Nix',
    menber: ['村田利秀', '武田卓樹', '油布陸叶'],
    id: '4svtHC6XKs0',
  },
  {
    title: '出欠管理アプリ',
    menber: ['川野智也', '中村凌', '加藤大嘉'],
    id: 'pjoUW1X9pbo',
  },
  {
    title: 'JOBFIT',
    menber: ['藤本悠真', '堀田秀太', '櫃間海斗'],
    id: 'Zyhq8LUj_HU',
  },
  {
    title: 'ナンプレ',
    menber: ['夏目昴', '地頭薗拓馬', '谷口海斗'],
    id: 'K-drTwAa7gE',
  },
  {
    title: 'JoyCasino',
    menber: ['時田尊', '田谷竜成', '石橋竜馬'],
    id: '8_-fR1aOCbk',
  },
  {
    title: 'アイスクンのRTA',
    menber: ['岡田淳典', '竹川潤', '片平皓大'],
    id: 'RtaIjZfbRoQ',
  },
  {
    title: '数独闘技場',
    menber: ['鈴木大翔', '仲野伊吹', '小倉まゆ'],
    id: 'm2auKQaVHD4',
  },
  {
    title: 'カードゲームアプリ',
    menber: ['石毛友翔', '浅野光貴', '川野元熙'],
    id: 'TZRAT61llFw',
  },
  {
    title: 'MyReview',
    menber: ['髙橋清吾', '越川慶士', '笠原大河'],
    id: 'PFot1-k8Ix0',
  },
  {
    title: 'ディズニー提案サイト',
    menber: ['堀越咲愛', '生方さくら'],
    id: '-Th2A41e0fQ',
  },
  {
    title: '図書管理アプリ',
    menber: ['水野香苗', '名塚悠作'],
    id: '1agLDQaru8o',
  },
];

const iframeResize = () => {
  document.querySelectorAll('iframe').forEach((iframe) => {
    const height = (iframe.clientWidth * 9) / 16;
    iframe.style.height = height + 'px';
  });
};

const apply = async () => {
  teams.sort(() => Math.random() - 0.5);
  for await (const team of teams) {
    const iframe = document.createElement('iframe');
    const viewInfoDiv = document.createElement('div');
    viewInfoDiv.classList.add('view-info');
    const textDiv = document.createElement('div');
    textDiv.innerText = team.title + '：' + team.menber.join(', ');
    viewInfoDiv.append(textDiv);
    const galleryLi = document.createElement('li');
    galleryLi.append(iframe);
    galleryLi.append(viewInfoDiv);
    document.querySelector('.gallery').append(galleryLi);

    const img = document.createElement('img');
    img.src = 'https://img.youtube.com/vi/' + team.id + '/default.jpg';
    const choiceBtnLi = document.createElement('li');
    choiceBtnLi.append(img);
    document.querySelector('.choice-btn').append(choiceBtnLi);
  }
  document.querySelector('.gallery iframe').src =
    'https://www.youtube.com/embed/' + teams[0].id;

  //上部画像の設定
  $('.gallery').slick({
    infinite: true, //スライドをループさせるかどうか。初期値はtrue。
    fade: true, //フェードの有効化
    arrows: true, //左右の矢印あり
    prevArrow: '<div class="slick-prev"></div>', //矢印部分PreviewのHTMLを変更
    nextArrow: '<div class="slick-next"></div>', //矢印部分NextのHTMLを変更
  });

  //選択画像の設定
  $('.choice-btn').slick({
    infinite: false, //スライドをループさせるかどうか。初期値はtrue。
    slidesToShow: 12, //表示させるスライドの数
    focusOnSelect: true, //フォーカスの有効化
    asNavFor: '.gallery', //連動させるスライドショーのクラス名
  });

  //下の選択画像をスライドさせずに連動して変更させる設定。
  $('.gallery').on(
    'beforeChange',
    function (event, slick, currentSlide, nextSlide) {
      console.log(currentSlide + ':' + nextSlide);
      //サムネイルのslick-currentを削除し次のスライド要素にslick-currentを追加
      $('.choice-btn .slick-slide')
        .removeClass('slick-current')
        .eq(nextSlide)
        .addClass('slick-current');

      console.log($('.gallery iframe').eq(currentSlide));
      console.log(document.querySelectorAll('.gallery iframe')[currentSlide]);

      const current =
        document.querySelectorAll('.gallery iframe')[currentSlide];
      current.src = '';
      const next = document.querySelectorAll('.gallery iframe')[nextSlide];
      next.src = 'https://www.youtube.com/embed/' + teams[nextSlide].id;

      // document
      //   .querySelectorAll('.gallery iframe')
      //   [currentSlide].contentWindow.postMessage(
      //     '{"event":"command", "func":"stopVideo", "args":null}',
      //     '*'
      //   );

      // //クリックイベントで動画を操作
      // //再生
      // document
      //   .getElementById('ytplay')
      //   .addEventListener('click', function (event) {
      //     ag2ytControl('playVideo');
      //   });
      // //一時停止
      // document
      //   .getElementById('ytpause')
      //   .addEventListener('click', function (event) {
      //     ag2ytControl('pauseVideo');
      //   });
      // //停止
      // document
      //   .getElementById('ytstop')
      //   .addEventListener('click', function (event) {
      //     ag2ytControl('stopVideo');
      //   });
    }
  );

  iframeResize();
  window.addEventListener('resize', iframeResize);
};

apply();
