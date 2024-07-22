
var selectedFormVersion = '';


var builder
jQuery(function($) {



container = document.getElementById("build-wrap");
var options = {
    controlPosition: 'right',
    showActionButtons: false,
    roles: {
        'Agent': 'agent',
        'Exhibitor': 'Exhibitor'
    },
    inputSets: [
        {
            label: 'T&C',
            fields: JSON.parse(`[
                        {
                            "type": "header",
                            "subtype": "h1",
                            "label": "Terms and Conditions",
                            "access": false
                        },
                        {
                              "type": "paragraph",
                              "label": "<br><br>",
                              "access": false
                        },
                        {
                            "type": "paragraph",
                            "label": "I hereby apply for joining HKTDC Hong Kong International Jewellery Show 2024. We agree to abide by the \\"Terms of Application and Exhibition Rules & Regulations\\" and the \\"Terms & Conditions for Official Fair Magazines / Online Promotions\\" set out by the Organiser(s).\\n\\nI understand that my company could not enjoy the Convention & Exhibition Industry Subsidy Scheme using the same or other connected enterprise(s) for more than once at HKTDC Hong Kong International Jewellery Show to promote the same nature of products/services, and HKTDC has the right to request for more information/documents for accessing the eligibility of my company for enjoying the subsidy if needed. HKTDC reserves the right to collect the full participation fee from my company if it is found ineligible for the subsidy.\\n\\nWe acknowledge that the above information may be used by the Organiser(s) for incorporation in all or any of its database for direct marketing or business matching purpose, and for any other purposes as stated in the Privacy Policy Statement. We confirm that we have the consent and the authority of each individual named in this form to release their personal data for the purposes stated herein.\\n\\nThe Organiser(s) can on-pass our information to third parties for promotion of HKTDC Hong Kong International Jewellery Show 2024. We accept that the Organiser(s) bears no responsibility for any error or omission.",
                            "access": false
                        },
                        {
                              "type": "paragraph",
                              "label": "<br><br>",
                              "access": false
                        },
                        {
                            "type": "checkbox-group",
                            "required": true,
                            "label": "I Confirm:",
                            "toggle": false,
                            "inline": false,
                            "access": false,
                            "other": false,
                            "values": [
                              {
                                "label": "that the information provided in this form and the attached document(s) (including supplementary information and document(s) (if any)) are true, complete, and correct. Any incorrect/inaccurate information provided in this form and the attached document(s) (including supplementary information and document(s) (if any)) may render this application invalid. Full or partial refund of the subsidy shall be required.",
                                "value": "1",
                                "selected": false
                              }
                            ]
                          },
                          {
                              "type": "checkbox-group",
                              "required": true,
                              "label": "I understand and accept:",
                              "toggle": false,
                              "inline": false,
                              "access": false,
                              "other": false,
                              "values": [
                                {
                                  "label": "the application details, Terms and Conditions, and the content of this form. that the submission of this form does not constitute any guarantee or undertaking by the Organiser in respect of the eventual approval of any subsidy under the Scheme covered in this application. that the decisions of the Organiser in respect of this application are final, and that the Organiser reserves the right to adjust the amount of subsidy and reject the application without giving any reason and without incurring any liability of whatever nature to any person.",
                                  "value": "2",
                                  "selected": false
                                }
                              ]
                            },
                          {
                              "type": "checkbox-group",
                              "required": true,
                              "label": "I accept:",
                              "toggle": false,
                              "inline": false,
                              "access": false,
                              "other": false,
                              "values": [
                                {
                                  "label": "I have read the terms and conditions stated above and wish to signify my acceptance.",
                                  "value": "3",
                                  "selected": false
                                }
                              ]
                            }


                    ]`)
        }
    ]
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
    function submitForApproval()
    {
            alert('Form:'+selectedFormVersion+" submit successfully");
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