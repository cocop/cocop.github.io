const titleList = [
  "憧れのあの娘が突然迫ってくるんだが、どうしたらいい?",
  "貴方がわたしを好きになる自信はありませんが、わたしが貴方を好きになる自信はあります",
  "異世界ならニートが働くと思った? エルフの姫を奴隷にして世界を支配させます。",
  "イチから始める最強勇者育成 毒の沼を泳いで渡る彼女たちを勇者にするのは間違っているだろうか",
  "エルフ嫁と始める異世界領主生活 俺の住む島に異世界が来ちゃったんだが",
  "オタク荘の腐ってやがるお嬢様たち",
  "オタサーの姫と恋ができるわけがない。",
  "落ちてきた龍王と滅びゆく魔女の国",
  "お兄ちゃんだけど愛さえあれば関係ないよねっ",
  "「お前ごときが魔王に勝てると思うな」とガチ勢に勇者パーティを追放されたので、王都で気ままに暮らしたい",
  "俺がお嬢様学校に「庶民サンプル」として拉致られた件",
  "俺が彼女に迫られて、妹が怒ってる?",
  "俺と彼女が下僕で奴隷で主従契約",
  "俺の妹がこんなに可愛いわけがない",
  "俺の彼女と幼なじみが修羅場すぎる",
  "俺の脳内選択肢が、学園ラブコメを全力で邪魔している",
  "女の子は優しくて可愛いものだと考えていた時期が俺にもありました",
  "急募）美少女達のフラグをへし折り、委員長を辞める方法",
  "小悪魔どもが俺の部屋を溜まり場にしている",
  "恋人にしようと生徒会長そっくりの女の子を錬成してみたら、オレが下僕になっていました",
  "ここは異世界コンビニ デモン・イレブン お客様、回復魔法をかけながらの立ち読みはご遠慮下さい！",
  "(この世界はもう俺が救って富と権力を手に入れたし、女騎士や女魔王と城で楽しく暮らしてるから、俺以外の勇者は)もう異世界に来ないでください。",
  "邪神に転生したら配下の魔王軍がさっそく滅亡しそうなんだが、どうすればいいんだろうか",
  "終末なにしてますか? 忙しいですか? 救ってもらっていいですか?‎",
  "女子率の高すぎる水泳部で色仕掛けに負けた俺",
  "真の仲間じゃないと勇者のパーティーを追い出されたので、辺境でスローライフすることにしました",
  "誰もが恐れるあの委員長が、ぼくの専属メイドになるようです。",
  "男子高校生で売れっ子ライトノベル作家をしているけれど、年下のクラスメイトで声優の女の子に首を絞められている。―Time to Play―",
  "ダンジョンに出会いを求めるのは間違っているだろうか",
  "チェリッシュ! 妹が俺を愛しているどころか年上になった",
  "ネトゲの嫁は女の子じゃないと思った?",
  "縫い上げ! 脱がして? 着せかえる!! 彼女が高校デビューに失敗して引きこもりと化したので、俺が青春をコーディネートすることに。",
  "パパのいうことを聞きなさい!",
  "引きこもりたちに俺の青春が翻弄されている",
  "ファタモルガーナの館 ―The house in Fata morgana― あなたの原典に至る物語",
  "普通のおっさんだけど、神さまからもらった能力で異世界を旅してくる。疲れたら転移魔法で自宅に帰る。",
  "僕と彼女とカノジョとかのじょ",
  "僕の文芸部にビッチがいるなんてありえない。",
  "名門校の女子生徒会長がアブドゥル＝アルハザードのネクロノミコンを読んだら",
  "元勇者のおっさん、転生して宿屋を手伝う　～勇者に選ばれ親孝行できなかった俺は、アイテムとステータスを引き継ぎ、過去へ戻って実家の宿屋を繁盛させる ",
  "問題児たちが異世界から来るそうですよ?",
  "やはり俺の青春ラブコメはまちがっている。",
  "勇者が修羅場すぎて世界を救ってる場合じゃない 魔王の呪いでヒロインたちを同時攻略しなければなりません",
  "勇者になれなかった俺はしぶしぶ就職を決意しました。",
  "鎧の姫君たち あるいは魔法石機関工学科の魔王による社会契約論",
  "恋愛恐怖症の僕のまわりに、恋人候補しかいないんですけど!",
];

const kuromojiFuncs = {
  analysis: (builder, text) => {
    return new Promise((resolve) => {
      builder.build((err, tokenizer) => {
        resolve(tokenizer.tokenize(text));
      });
    });
  },
  isGeneralNoun: (value) => {
    return value.pos === "名詞" && value.pos_detail_1 === "一般";
  },
};

const randomSelect = (arr) => {
  const selectIndex = Math.floor(Math.random() * arr.length);
  return arr[selectIndex !== arr.length ? selectIndex : arr.length];
};

const app = {
  ctx: {
    text: null,
    msg: null,
    log: null,
  },
  builder: kuromoji.builder({ dicPath: "./kuromoji/dict/" }),
  actions: {
    toLightNovelTitle: async () => {
      const analyzed = {
        title: await kuromojiFuncs.analysis(
          app.builder,
          randomSelect(titleList)
        ),
        text: await kuromojiFuncs.analysis(app.builder, app.ctx.text),
      };

      const textGenlNoun = analyzed.text
        .filter(kuromojiFuncs.isGeneralNoun)
        .map((value) => {
          return value.surface_form;
        });

      const result = analyzed.title
        .map((value) => {
          return kuromojiFuncs.isGeneralNoun(value) && Math.random() < 0.8
            ? randomSelect(textGenlNoun)
            : value.surface_form;
        })
        .join("");

      app.ctx.msg = result;
      app.ctx.log = JSON.stringify(analyzed.title, null, 2);
    },
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  new Vue({
    el: "#app",
    data: { ctx: app.ctx },
    methods: app.actions,
  });
});
