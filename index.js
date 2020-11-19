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
