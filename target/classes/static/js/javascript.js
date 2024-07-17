
var selectedFormVersion = '';


var builder
jQuery(function($) {



container = document.getElementById("build-wrap");

  var options = {
        controlPosition: 'right',
        showActionButtons: false
      };
  builder=$(container).formBuilder(options);

    const navItems = document.querySelectorAll('.nav-item.section');
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation();
            const subList = item.querySelector('.sub-list');
            if (subList) {
                subList.classList.toggle('visible');
            }
        });
    });

$("#leftside-navigation .sub-menu > a").click(function(e) {
  $("#leftside-navigation ul ul").slideUp(), $(this).next().is(":visible") || $(this).next().slideDown(),
  e.stopPropagation()
})


$("#basic").next().slideDown();

});
  function showData(){
      const formRenderData = builder.actions.getData('json')

        alert(formRenderData);
  }



    // Function to toggle the panel visibility
    function togglePanel() {
        const panel = document.querySelector('.sticky-controls');
        const toggleButton = document.querySelector('#toggle-panel-button');
    const formWrap = document.querySelector('.form-wrap');


    if (panel.classList.contains('hide')) {
        panel.style.display = 'block';
        // Delay removing the 'hide' class to allow display to take effect
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                panel.classList.remove('hide');
            });
        });
        setTimeout(() => {
            toggleButton.textContent = 'Hide Panel';
        }, 200); // Match the transition duration
    } else {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
        panel.classList.add('hide');
                });
            });
        // Set display: none after the animation completes
        setTimeout(() => {
            panel.style.display = 'none';
            toggleButton.textContent = 'Show Panel';
        }, 200); // Match the transition duration
    }
    }

    function saveFormAction()
    {
        var saveName = $("#saveName").val();
        var formData = JSON.parse(builder.actions.getData('json'));

        fetch('/api/JSONForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: saveName,
            formType: "CompanyInformation",
            formData: formData  // This is now a JSON object, not a string
          })
        }).then(data => {
            // Handle the successful response data here
            alert('Form:'+saveName+" saved successfully");

            var newOption = $('<option></option>')
                .attr('value', saveName)
                .text(saveName);

            // Append the new option to the select element
            $('#companyInfo').append(newOption);

            // You can add more logic here, such as updating the UI or redirecting the user
          })

    }

    function deployFormAction()
    {
        var formData = JSON.parse(builder.actions.getData('json'));

        fetch('/api/deployJSONForm?formType=CompanyInformation&name='+selectedFormVersion, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: saveName,
            formType: "CompanyInformation",
            formData: formData  // This is now a JSON object, not a string
          })
        }).then(data => {
            // Handle the successful response data here
            alert('Form:'+selectedFormVersion+" deployed successfully");
            // You can add more logic here, such as updating the UI or redirecting the user
          })

    }

    async function handleSelectChange(event) {
    selectedFormVersion= event.target.value;
        if (event.target.value === "") {
            builder.actions.setData("");
            return;
        }

        const selectedValue = event.target.value;
        try {
            const response = await fetch('/api/findByName?name=' + encodeURIComponent(selectedValue), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Assuming the API returns a JSON response with a string field
            const data = await response.json();
            const stringOutput = data.formData; // Adjust this line based on your actual response structure

            builder.actions.setData(stringOutput);

            // Add more logic here, such as updating the UI or redirecting the user
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    function openPreview() {
           var previewData = JSON.parse(builder.actions.getData('json'));

                const previewWindow = window.open("", "Form Preview", "width=1536,height=816");

                fetch('/previewForm', {
                  method: 'POST',
                  body: JSON.stringify({
                    jsonData: previewData  // This is now a JSON object, not a string
                  })
                })
                .then(response => response.text()) // Parse the response body as text
                .then(data => {

                    previewWindow.document.open();
                    previewWindow.document.write(data);
                    previewWindow.document.close();
                });


                    // You can add more logic here, such as updating the UI or redirecting the user

    }


//    function handleSelectChange (event)
//    {
//        const selectedValue = event.target.value;
//        fetch('/api/findByName?name='+selectedValue, {
//          method: 'get',
//          headers: {
//            'Content-Type': 'application/json'
//          },
//        }).then(data => {
//            // Handle the successful response data here
//            alert('data:'+data);
//            builder.actions.setData(data);
//
//
//            // You can add more logic here, such as updating the UI or redirecting the user
//          })
//
//
//    }
//document.addEventListener('DOMContentLoaded', function() {
//    // Function to inject the button above the sticky controls
//    function injectToggleButton() {
//        const cbWrap = document.querySelector('.sticky-controls');
//        if (cbWrap) {
//            const toggleButton = document.createElement('button');
//            toggleButton.className = 'toggle-button';
//            toggleButton.textContent = 'Hide Panel';
//            toggleButton.onclick = togglePanel;
//
//            // Insert the button just before cbWrap
//            cbWrap.insertAdjacentElement('beforebegin', toggleButton);
//        }
//    }
//
//
//    // Inject the button 0.5 seconds after the DOM content has loaded
//    setTimeout(injectToggleButton, 500);
//});