function d() {
  const t = window.location.search.substring(1).split("&"), o = {};
  return t.forEach((e) => {
    const [i, n] = e.split("=");
    o[decodeURIComponent(i)] = decodeURIComponent(n);
  }), o;
}
function f(r, t, o) {
  const e = new Date(Date.now() + o * 864e5).toUTCString();
  document.cookie = `${r}=${t}; expires=${e}; path=/`;
}
function l(r) {
  return document.cookie.split("; ").reduce((t, o) => {
    const [e, i] = o.split("=");
    return t[e] = i ? decodeURIComponent(i) : "", t;
  }, {})[r];
}
window.addEventListener("DOMContentLoaded", () => {
  const r = d(), t = document.referrer, o = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_device",
    "utm_placement",
    "utm_gclid",
    "utm_referrer"
    // Add more params here
  ];
  let e = {};
  if (o.forEach((n) => {
    r[n] && (e[n] = r[n]);
  }), !e.utm_source && !e.utm_medium && t) {
    const n = t.includes("google");
    e.utm_source = n ? "google" : new URL(t).hostname, e.utm_medium = n ? "organic" : "others";
  }
  t && (e.utm_referrer = t), Object.keys(e).length > 0 && f("utm_params", JSON.stringify(e), 30);
  const i = JSON.parse(l("utm_params"));
  if (i) {
    const n = document.title;
    i.landing_page = n, Object.entries(i).forEach(([m, s]) => {
      const a = document.querySelector(`input[name="${m}"]`);
      a && (a.value = s);
    });
  }
});
var c = c || [];
c.push(function() {
  $(document).off("submit"), $("form").submit(function(r) {
    r.preventDefault();
    const t = $(this), o = $("[type=submit]", t), e = o.val(), i = o.attr("data-wait"), n = t.attr("method"), m = t.attr("action"), s = t.attr("data-redirect"), a = t.serialize();
    i && o.val(i), $.ajax(m, {
      data: a,
      method: n
    }).done((u) => {
      if (s) {
        window.location = s;
        return;
      }
      t.hide().siblings(".w-form-done").show().siblings(".w-form-fail").hide();
    }).fail((u) => {
      t.siblings(".w-form-done").hide().siblings(".w-form-fail").show();
    }).always(() => {
      o.val(e);
    });
  });
});
