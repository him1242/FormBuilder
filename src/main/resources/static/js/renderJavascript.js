    jQuery(function($) {

    // Use the formString variable defined in the HTML
    var formData = JSON.parse(formString);

    // Ensure formData is an array or string, as expected by formRender
    var formDataString = JSON.stringify(formData.formData);

    $('.formRender').formRender({
        formData: formDataString,
        dataType: 'json',
        render: true
    });
    });


    function submitUserData()
    {
        var formData = $('.render-wrap').formRender('userData')
const date = new Date();
const formattedDate = date.toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});
        fetch('/api/submitUserForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formattedDate+"_JewelleryShowForm",
            formType: "CompanyInformation",
            formData: formData  // This is now a JSON object, not a string
          })
        }).then(data => {
            alert("your form submitted.")

          })



    }