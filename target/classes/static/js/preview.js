    jQuery(function($) {


        // Use the formString variable defined in the HTML
        var formData = JSON.parse(formString);

        // Ensure formData is an array or string, as expected by formRender
        var formDataString = JSON.stringify(formData.jsonData);

        $('.formRender').formRender({
            formData: formDataString,
            dataType: 'json',
            render: true
        });





    });

       function resizeWindow(width, height) {
                window.resizeTo(width, height);
            }