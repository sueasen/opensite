const teams = [
  {
    title: '出欠管理アプリ',
    menber: ['峰岸紘士', '磯邉佳鋳', '田中竜也'],
    menberShort: ['峰岸', '磯邉', '田中'],
    id: 'yVRhyLFwvtU',
  },
  {
    title: 'Nix',
    menber: ['村田利秀', '武田卓樹', '油布陸叶'],
    menberShort: ['村田', '武田', '油布'],
    id: '4svtHC6XKs0',
  },
  {
    title: '出欠管理アプリ',
    menber: ['川野智也', '中村凌', '加藤大嘉'],
    menberShort: ['川野', '中村', '加藤'],
    id: 'pjoUW1X9pbo',
  },
  {
    title: 'JOBFIT',
    menber: ['藤本悠真', '堀田秀太', '櫃間海斗'],
    menberShort: ['藤本', '堀田', '櫃間'],
    id: 'Zyhq8LUj_HU',
  },
  {
    title: 'ナンプレ',
    menber: ['夏目昴', '地頭薗拓馬', '谷口海斗'],
    menberShort: ['夏目', '地頭薗', '谷口'],
    id: 'K-drTwAa7gE',
  },
  {
    title: 'JoyCasino',
    menber: ['時田尊', '田谷竜成', '石橋竜馬'],
    menberShort: ['時田', '田谷', '石橋'],
    id: '8_-fR1aOCbk',
  },
  {
    title: 'アイスクンのRTA',
    menber: ['岡田淳典', '竹川潤', '片平皓大'],
    menberShort: ['岡田', '竹川', '片平'],
    id: 'RtaIjZfbRoQ',
  },
  {
    title: '数独闘技場',
    menber: ['鈴木大翔', '仲野伊吹', '小倉まゆ'],
    menberShort: ['鈴木', '仲野', '小倉'],
    id: 'm2auKQaVHD4',
  },
  {
    title: 'カードゲームアプリ',
    menber: ['石毛友翔', '浅野光貴', '川野元熙'],
    menberShort: ['石毛', '浅野', '川野'],
    id: 'TZRAT61llFw',
  },
  {
    title: 'MyReview',
    menber: ['髙橋清吾', '越川慶士', '笠原大河'],
    menberShort: ['髙橋', '越川', '笠原'],
    id: 'PFot1-k8Ix0',
  },
  {
    title: 'ディズニー提案サイト',
    menber: ['堀越咲愛', '生方さくら'],
    menberShort: ['堀越', '生方'],
    id: '-Th2A41e0fQ',
  },
  {
    title: '図書管理アプリ',
    menber: ['水野香苗', '名塚悠作'],
    menberShort: ['水野', '名塚'],
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
    iframe.setAttribute('allowfullscreen', '');
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
    const memberDiv = document.createElement('div');
    memberDiv.innerText = team.menberShort.join(', ');

    const choiceBtnLi = document.createElement('li');
    choiceBtnLi.append(img);
    choiceBtnLi.append(memberDiv);
    document.querySelector('.choice-btn').append(choiceBtnLi);
  }
  document.querySelector('.gallery iframe').src = iframeYoutubeUrl(teams[0].id);

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
      //サムネイルのslick-currentを削除し次のスライド要素にslick-currentを追加
      $('.choice-btn .slick-slide')
        .removeClass('slick-current')
        .eq(nextSlide)
        .addClass('slick-current');

      const current =
        document.querySelectorAll('.gallery iframe')[currentSlide];
      current.src = '';
      const next = document.querySelectorAll('.gallery iframe')[nextSlide];
      next.src = iframeYoutubeUrl(teams[nextSlide].id);
    }
  );

  iframeResize();
  window.addEventListener('resize', iframeResize);
};

const iframeYoutubeUrl = (youtubeId) => {
  let youtubeUrl = 'https://www.youtube.com/embed/' + youtubeId;
  return youtubeUrl;
};

apply();
