console.log("form settings loaded!");
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
