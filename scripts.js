function getQueryParams() {
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split("&");
  const params = {};
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return params;
}
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
function getCookie(name) {
  return document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value ? decodeURIComponent(value) : "";
    return acc;
  }, {})[name];
}
window.addEventListener("DOMContentLoaded", () => {
  const queryParams = getQueryParams();
  const marketingParams = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_device",
    "utm_placement",
    "utm_gclid"
    // Add more params here
  ];
  let utmParams = {};
  marketingParams.forEach((param) => {
    if (queryParams[param]) {
      utmParams[param] = queryParams[param];
    }
  });
  if (Object.keys(utmParams).length > 0) {
    setCookie("utm_params", JSON.stringify(utmParams), 30);
  }
  const utmParamsFromCookies = getCookie("utm_params") ? JSON.parse(getCookie("utm_params")) : {};
  if (utmParamsFromCookies) {
    const pageTitle = document.title;
    utmParamsFromCookies["conversion_page"] = pageTitle;
    const hostName = window.location.hostname;
    utmParamsFromCookies["hostname"] = hostName;
    const forms = document.querySelectorAll('form[formType="captureLead"]');
    forms.forEach((form) => {
      Object.entries(utmParamsFromCookies).forEach(([key, value]) => {
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = key;
        hiddenInput.value = value;
        form.appendChild(hiddenInput);
      });
    });
  }
});
var Webflow = Webflow || [];
Webflow.push(function() {
  $(document).off("submit");
  $("form").submit(function(e) {
    e.preventDefault();
    const $form = $(this);
    const $submit = $("[type=submit]", $form);
    const buttonText = $submit.val();
    const buttonWaitingText = $submit.attr("data-wait");
    const formMethod = $form.attr("method");
    const formAction = $form.attr("action");
    const formRedirect = $form.attr("data-redirect");
    const formData = $form.serialize();
    if (buttonWaitingText) {
      $submit.val(buttonWaitingText);
    }
    $.ajax(formAction, {
      data: formData,
      method: formMethod
    }).done((res) => {
      if (formRedirect) {
        window.location = formRedirect;
        return;
      }
      $form.hide().siblings(".w-form-done").show().siblings(".w-form-fail").hide();
    }).fail((res) => {
      $form.siblings(".w-form-done").hide().siblings(".w-form-fail").show();
    }).always(() => {
      $submit.val(buttonText);
    });
  });
});
