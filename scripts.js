var n = n || [];
n.push(function() {
  $(document).off("submit"), $("form").submit(function(s) {
    s.preventDefault();
    const t = $(this), o = $("[type=submit]", t), e = o.val(), i = o.attr("data-wait"), r = t.attr("method"), f = t.attr("action"), a = t.attr("data-redirect"), m = t.serialize();
    i && o.val(i), $.ajax(f, {
      data: m,
      method: r
    }).done((c) => {
      if (a) {
        window.location = a;
        return;
      }
      t.hide().siblings(".w-form-done").show().siblings(".w-form-fail").hide();
    }).fail((c) => {
      t.siblings(".w-form-done").hide().siblings(".w-form-fail").show();
    }).always(() => {
      o.val(e);
    });
  });
});
