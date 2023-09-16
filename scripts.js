console.log("form settings loaded!");
var s = s || [];
s.push(function() {
  $(document).off("submit"), $("form").submit(function(a) {
    a.preventDefault();
    const t = $(this), o = $("[type=submit]", t), e = o.val(), i = o.attr("data-wait"), r = t.attr("method"), f = t.attr("action"), n = t.attr("data-redirect"), d = t.serialize();
    i && o.val(i), $.ajax(f, {
      data: d,
      method: r
    }).done((l) => {
      if (n) {
        window.location = n;
        return;
      }
      t.hide().siblings(".w-form-done").show().siblings(".w-form-fail").hide();
    }).fail((l) => {
      t.siblings(".w-form-done").hide().siblings(".w-form-fail").show();
    }).always(() => {
      o.val(e);
    });
  });
});
